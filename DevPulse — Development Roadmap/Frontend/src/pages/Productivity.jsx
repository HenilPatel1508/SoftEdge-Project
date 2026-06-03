import React, { useState, useEffect, useMemo } from "react";
import { FaPlay, FaPause, FaRedo, FaPlus, FaTrash, FaCoffee } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Productivity = () => {
  // ================= POMODORO =================
  // ================= POMODORO =================
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [seconds, setSeconds] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            // switch session
            if (!isBreak) {
              setIsBreak(true);
              setSeconds(BREAK_TIME);
              setSessionCount((s) => s + 1);
            } else {
              setIsBreak(false);
              setSeconds(WORK_TIME);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isBreak]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const total = isBreak ? BREAK_TIME : WORK_TIME;
  const progress = ((total - seconds) / total) * 100;

  // ================= TASKS =================
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, idx) => idx !== i));
  };

  // ================= DAILY PLAN =================
  const plan = ["Morning Coding", "Meeting", "Workout", "Project Work"];

  // ================= CHART DATA =================
  const chartData = useMemo(
    () => [
      { day: "Mon", tasks: 5 },
      { day: "Tue", tasks: 8 },
      { day: "Wed", tasks: 6 },
      { day: "Thu", tasks: 10 },
      { day: "Fri", tasks: 7 },
      { day: "Sat", tasks: 4 },
      { day: "Sun", tasks: 3 },
    ],
    [],
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Productivity Dashboard
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Pomodoro, tasks, planner & weekly insights
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* ================= POMODORO ================= */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border shadow-sm relative overflow-hidden">
          {/* header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">⏱ Pomodoro</h2>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                isBreak
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {isBreak ? "Break Time ☕" : "Focus Mode 🔥"}
            </span>
          </div>

          {/* circular progress */}
          <div className="flex justify-center my-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full">
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear drop-shadow-[0_0_10px_#3b82f6]"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-bold">{formatTime(seconds)}</div>
                <div className="text-xs text-gray-500">
                  Session {sessionCount}
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}
          {/* 🎮 Interactive Controls */}
          <div className="flex justify-center gap-4 mt-5">
            {/* START */}
            <button
              onClick={() => setIsRunning(true)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:scale-110 transition"
            >
              <FaPlay />
            </button>

            {/* PAUSE */}
            <button
              onClick={() => setIsRunning(false)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:scale-110 transition"
            >
              <FaPause />
            </button>

            {/* BREAK */}
            <button
              onClick={() => {
                setIsRunning(false);
                setIsBreak(true);
                setSeconds(5 * 60);
                playBreakSound();
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:scale-110 transition"
            >
              <FaCoffee />
            </button>

            {/* RESET */}
            <button
              onClick={() => {
                setIsRunning(false);
                setIsBreak(false);
                setSeconds(WORK_TIME);
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:scale-110 transition"
            >
              <FaRedo />
            </button>
          </div>
        </div>

        {/* ================= TASKS ================= */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border shadow-sm flex flex-col h-80">
          <h2 className="font-bold mb-4 text-lg">📌 Tasks</h2>

          {/* INPUT */}
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="border p-2 flex-1 rounded text-sm sm:text-base w-full"
              placeholder="Add task..."
            />

            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center w-full sm:w-auto"
            >
              <FaPlus />
            </button>
          </div>

          {/* SCROLL AREA (IMPORTANT PART) */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {tasks.map((t, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border p-3 rounded"
              >
                <span
                  onClick={() => toggleTask(i)}
                  className={`cursor-pointer text-sm sm:text-base wrap-break-word ${
                    t.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {t.text}
                </span>

                <FaTrash
                  onClick={() => deleteTask(i)}
                  className="text-red-500 cursor-pointer text-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= DAILY PLANNER ================= */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border shadow-sm">
          <h2 className="font-bold mb-4 text-lg">🗓 Daily Planner</h2>

          <ul className="space-y-2">
            {plan.map((p, i) => (
              <li
                key={i}
                className="p-2 bg-gray-100 rounded text-sm sm:text-base"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= WEEKLY CHART ================= */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border shadow-sm">
        <h2 className="font-bold mb-4 text-lg">📊 Weekly Activity</h2>

        <div className="space-y-3">
          {chartData.map((item, i) => {
            const max = 10;
            const percent = (item.tasks / max) * 100;

            return (
              <div key={i} className="space-y-1">
                {/* label row */}
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.day}</span>
                  <span className="text-gray-500">{item.tasks} tasks</span>
                </div>

                {/* glow bar */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-md transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Productivity;
