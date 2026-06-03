import express from "express";
import supabase from "./config/supabaseClient.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";
import userRoutes from "./routes/user.routes.js";
import axios from "axios";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

/* -----------------------------
   🔥 GITHUB CONFIG
------------------------------*/
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubHeaders = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

/* -----------------------------
   🧑 PROFILE + REPOS + EVENTS
------------------------------*/
app.get("/api/github/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    };

    // PROFILE
    const userRes = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers },
    );

    // REPOS
    const repoRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers },
    );

    // EVENTS (for activity + rough commits)
    const eventRes = await axios.get(
      `https://api.github.com/users/${username}/events/public`,
      { headers },
    );

    // 🔥 calculate rough commits + PRs from events
    let commits = 0;
    let prs = 0;

    eventRes.data.forEach((event) => {
      if (event.type === "PushEvent") {
        commits += event.payload?.size || 0;
      }
      if (event.type === "PullRequestEvent") {
        prs += 1;
      }
    });

    res.json({
      profile: userRes.data,
      repos: repoRes.data,
      events: eventRes.data,
      stats: {
        followers: userRes.data.followers,
        repos: userRes.data.public_repos,
        following: userRes.data.following,

        totalCommits: commits,
        pullRequests: prs,
      },
    });
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({ error: "GitHub fetch failed" });
  }
});

/* -----------------------------
   🔥 CONTRIBUTIONS (GRAPHQL)
------------------------------*/
app.post("/api/github/contributions", async (req, res) => {
  try {
    const { username } = req.body;

    const response = await axios.post(
      "https://api.github.com/graphql",
      {
        query: `
        query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      },
    );
    console.log("USERNAME:", username);
    console.log("GRAPHQL RESPONSE:", JSON.stringify(response.data, null, 2));
    const user = response?.data?.data?.user;

    if (!response?.data?.data || !user) {
      console.log("GraphQL Error Response:", response.data);

      return res.status(400).json({
        error: "GitHub API failed (invalid username or token issue)",
        details: response.data,
      });
    }

    if (!user) {
      return res.status(400).json({
        error: "Invalid GitHub username or token issue",
      });
    }

    const weeks = user.contributionsCollection.contributionCalendar.weeks || [];

    const data = [];

    let totalCommits = 0;

    weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        totalCommits += day.contributionCount;
      });
    });

    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Contributions fetch failed" });
  }
});

/* -----------------------------
   Test route
------------------------------*/
app.get("/", (req, res) => {
  res.send("Express + Supabase + GitHub API 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
