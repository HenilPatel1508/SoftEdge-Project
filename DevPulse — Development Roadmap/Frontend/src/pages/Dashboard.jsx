import React, { useState, useEffect } from "react";
import {
  FaClock,
  FaTasks,
  FaCode,
  FaHeartbeat,
  FaStickyNote,
  FaCloudSun,
  FaCheckCircle,
  FaGithub,
  FaStopwatch,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Developer";

  // ================= STATS =================
  const [commitCount, setCommitCount] = useState(31); // 🔥 ADDED

  const stats = [
    {
      title: "Focus Time",
      value: "4h 32m",
      sub: "+12% from yesterday",
      color: "green",
      icon: <FaClock className="text-green-500 text-xl" />,
    },
    {
      title: "Tasks Done",
      value: "12/18",
      sub: "67% completion",
      color: "blue",
      icon: <FaTasks className="text-blue-500 text-xl" />,
    },
    {
      title: "Commits",
      value: commitCount, // 🔥 CHANGED (dynamic)
      sub: "This week",
      color: "purple",
      icon: <FaCode className="text-purple-500 text-xl" />,
    },
    {
      title: "Health Score",
      value: "85/100",
      sub: "Good condition",
      color: "emerald",
      icon: <FaHeartbeat className="text-emerald-500 text-xl" />,
    },
  ];

  const colorMap = {
    green: "text-green-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    emerald: "text-emerald-500",
  };

  // ================= WEATHER API =================
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoadingWeather(true);

        const API_KEY = "30c4a2dd1d6c9e4a82b89c1ca4bfa056";
        const city = "Ahmedabad";

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=23.0258&longitude=72.5873&hourly=temperature_2m`,
        );

        const data = await res.json();

        setWeather(data.hourly.temperature_2m ? {
          main: { temp: data.hourly.temperature_2m[0] },
          weather: [{ main: "Clear" }],
          name: city,
        } : null);
      } catch (err) {
        console.log("Weather error:", err);
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  // ================= POMODORO =================
  const [pomodoro, setPomodoro] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && pomodoro > 0) {
      timer = setInterval(() => setPomodoro((p) => p - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, pomodoro]);

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  // ================= CODING TIMER =================
  const [codingTime, setCodingTime] = useState(0);
  const [coding, setCoding] = useState(false);

  useEffect(() => {
    let t;
    if (coding) {
      t = setInterval(() => setCodingTime((p) => p + 1), 1000);
    }
    return () => clearInterval(t);
  }, [coding]);

  const formatCoding = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  // ================= TASKS =================
  const [tasks, setTasks] = useState([
    { text: "Fix login bug", done: false },
    { text: "Update API docs", done: true },
    { text: "Review PR #234", done: false },
    { text: "Deploy to staging", done: false },
  ]);

  const toggleTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
  };

  // ================= GITHUB =================
  const [githubData, setGithubData] = useState([10, 20, 8, 25, 15, 6, 12]);

  const refreshGithub = () => {
    const newData = Array.from(
      { length: 7 },
      () => Math.floor(Math.random() * 30) + 5,
    );

    setGithubData(newData);

    // 🔥 SYNC COMMITS WITH GRAPH
    const totalCommits = newData.reduce((a, b) => a + b, 0);
    setCommitCount(totalCommits);
  };

  return (
    <div className="space-y-8 w-full">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-black tracking-tight">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back,{" "}
          <span className="font-bold text-blue-600">{userName}</span> 👋 Here's
          your productivity overview ⚡
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">{item.title}</p>
              {item.icon}
            </div>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>

            <p className={`${colorMap[item.color]} text-sm mt-1`}>{item.sub}</p>
          </div>
        ))}
      </div>

      {/* MIDDLE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* POMODORO */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FaClock /> Pomodoro Timer
          </h3>

          <div className="text-5xl font-bold text-center my-8 text-gray-900">
            {formatTime(pomodoro)}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 bg-blue-500 text-white py-2 rounded-xl"
            >
              {isRunning ? "Pause" : "Start"}
            </button>

            <button
              onClick={() => {
                setPomodoro(25 * 60);
                setIsRunning(false);
              }}
              className="flex-1 bg-gray-300 py-2 rounded-xl"
            >
              Reset
            </button>
          </div>
        </div>

        {/* NOTES */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <FaStickyNote /> Quick Notes
          </h3>

          <textarea
            className="w-full h-36 border rounded-xl p-3"
            placeholder="Jot down your thoughts..."
          />
        </div>

        {/* WEATHER */}
        {/* WEATHER */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <FaCloudSun /> Weather
          </h3>

          {loadingWeather ? (
            <p className="text-gray-500">Loading weather...</p>
          ) : weather ? (
            <div className="text-center">
              <h2 className="text-4xl font-bold">
                {Math.round(weather.main?.temp)}°C
              </h2>

              <p className="text-gray-500">
                {weather.weather?.[0]?.main}, {weather.name}
              </p>
            </div>
          ) : (
            <p className="text-red-500">Weather not available</p>
          )}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TASKS */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FaCheckCircle /> Today's Tasks
          </h3>

          <ul className="space-y-3 text-sm">
            {tasks.map((t, i) => (
              <li
                key={i}
                onClick={() => toggleTask(i)}
                className={`cursor-pointer flex items-center gap-2 ${
                  t.done ? "line-through text-gray-400" : ""
                }`}
              >
                {t.done ? "☑" : "☐"} {t.text}
              </li>
            ))}
          </ul>
        </div>

        {/* GITHUB */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaGithub /> GitHub Activity
            </h3>

            <button
              onClick={refreshGithub}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Refresh
            </button>
          </div>

          <div className="h-36 flex items-end gap-2">
            {githubData.map((h, i) => (
              <div
                key={i}
                className="w-6 bg-linear-to-t from-blue-500 to-cyan-400 rounded-md"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

        {/* CODING TIMER */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
          <h3 className="font-semibold text-gray-800 flex items-center justify-center gap-2 mb-4">
            <FaStopwatch /> Coding Timer
          </h3>

          <div className="text-4xl font-bold mb-6">
            {formatCoding(codingTime)}
          </div>

          <button
            onClick={() => setCoding(!coding)}
            className="w-full bg-green-500 text-white py-2 rounded-xl"
          >
            {coding ? "Stop" : "Start Coding"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
