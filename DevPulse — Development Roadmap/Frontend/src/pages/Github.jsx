import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaGithub,
  FaCodeBranch,
  FaFire,
  FaStar,
  FaGitAlt,
} from "react-icons/fa";
import HeatMap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const Github = () => {
  const username = "HenilPatel1508"; // 👈 change here

  const [profile, setProfile] = useState({});
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [contrib, setContrib] = useState([]);
  const [stats, setStats] = useState({});
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
  const res = await axios.get(
    `http://localhost:5000/api/github/${username}`
  );

  setProfile(res.data.profile);
  setRepos(res.data.repos.slice(0, 6));
  setEvents(res.data.events.slice(0, 6));

  setStats(res.data.stats);
  setStreak(calculateStreak(res.data.events));

  const c = await axios.post(
    `http://localhost:5000/api/github/contributions`,
    { username }
  );

  setContrib(c.data);
};

  const calculateStreak = (events) => {
    const dates = new Set();

    events.forEach((e) => {
      if (e.type === "PushEvent") {
        const date = new Date(e.created_at).toDateString();
        dates.add(date);
      }
    });

    let streak = 0;
    let current = new Date();

    while (true) {
      const d = current.toDateString();
      if (dates.has(d)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* HEADER */}
      <div className="bg-black text-white p-8 rounded-3xl flex justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={profile.avatar_url}
            className="w-20 h-20 rounded-full border-4 border-white"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {profile.name || profile.login}
            </h1>
            <p className="text-gray-300">@{profile.login}</p>
          </div>
        </div>

        <a
          href={profile.html_url}
          className="bg-white text-black px-4 py-2 rounded-xl"
        >
          GitHub
        </a>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <Stat
          icon={<FaFire />}
          label="Total Commits"
          value={stats.totalCommits}
        />
        <Stat
          icon={<FaCodeBranch />}
          label="Pull Requests"
          value={stats.pullRequests}
        />
        <Stat icon={<FaGithub />} label="Repositories" value={stats.repos} />
        <Stat icon={<FaStar />} label="Current Streak" value={streak} />
      </div>

      {/* HEATMAP */}
      <div className="bg-white p-6 rounded-2xl">
        <h2 className="font-bold mb-4">Contributions</h2>

        <HeatMap
          startDate={new Date("2025-01-01")}
          endDate={new Date()}
          values={contrib}
          classForValue={(value) => {
            if (!value || value.count === 0) return "color-empty";
            if (value.count < 2) return "color-scale-1";
            if (value.count < 4) return "color-scale-2";
            return "color-scale-3";
          }}
        />
      </div>

      {/* REPOS */}
      <div className="bg-white p-6 rounded-2xl">
        <h2 className="font-bold mb-4">Repos</h2>

        {repos.map((r) => (
          <div key={r.id} className="border p-3 rounded mb-2">
            <h3 className="font-semibold">{r.name}</h3>
            <p className="text-sm text-gray-500">{r.language}</p>
          </div>
        ))}
      </div>

      {/* ACTIVITY */}
      <div className="bg-white p-6 rounded-2xl">
        <h2 className="font-bold mb-4">Activity</h2>

        {events.map((e, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <FaGitAlt className="text-green-500 mt-1" />
            <div>
              <p>{e.type}</p>
              <p className="text-sm text-gray-500">{e.repo.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Stat = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-2xl shadow">
    <div className="text-xl mb-2">{icon}</div>
    <p className="text-gray-500">{label}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default Github;
