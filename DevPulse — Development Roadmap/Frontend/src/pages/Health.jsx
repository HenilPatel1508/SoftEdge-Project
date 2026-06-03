import React, { useState } from "react";

const Health = () => {
  const [water, setWater] = useState(6);
  const [eye, setEye] = useState(4);
  const [stretch, setStretch] = useState(3);
  const [sleep, setSleep] = useState(7.5);

  const burnout = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        100 -
          ((water / 8) * 25 +
            (eye / 6) * 25 +
            (stretch / 5) * 20 +
            (sleep / 8) * 30),
      ),
    ),
  );

  // reusable button style
  const ActionBtn = ({ children, onClick, color }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200
      hover:scale-105 active:scale-95 shadow-sm
      ${color}`}
    >
      {children}
    </button>
  );

  const Card = ({ title, value, children, icon }) => (
    <div
      className="bg-white/70 backdrop-blur-xl border border-gray-100
      rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1
      transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          {icon} {title}
        </h3>
        <span className="text-sm font-bold text-gray-900">{value}</span>
      </div>

      {children}
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-gray-800">Health Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor your wellbeing and stay productive while coding 🚀
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card title="Water Intake" value={`${water}/8`} icon="💧">
          <div className="h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
              style={{ width: `${(water / 8) * 100}%` }}
            />
          </div>

          <div className="mt-3 flex justify-end gap-2">
            <ActionBtn
              onClick={() => setWater(Math.max(0, water - 1))}
              color="bg-red-100 text-red-600 hover:bg-red-200"
            >
              −
            </ActionBtn>

            <ActionBtn
              onClick={() => setWater(Math.min(8, water + 1))}
              color="bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              + Water
            </ActionBtn>
          </div>
        </Card>

        <Card title="Eye Breaks" value={`${eye}/6`} icon="👁️">
          <div className="h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-green-400 to-green-600"
              style={{ width: `${(eye / 6) * 100}%` }}
            />
          </div>

          <div className="mt-3 flex justify-end gap-2">
            <ActionBtn
              onClick={() => setEye(Math.max(0, eye - 1))}
              color="bg-red-100 text-red-600 hover:bg-red-200"
            >
              −
            </ActionBtn>

            <ActionBtn
              onClick={() => setEye(Math.min(6, eye + 1))}
              color="bg-green-100 text-green-600 hover:bg-green-200"
            >
              + Break
            </ActionBtn>
          </div>
        </Card>

        <Card title="Stretch" value={`${stretch}/5`} icon="🤸">
          <div className="h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-purple-400 to-purple-600"
              style={{ width: `${(stretch / 5) * 100}%` }}
            />
          </div>

          <div className="mt-3 flex justify-end gap-2">
            <ActionBtn
              onClick={() => setStretch(Math.max(0, stretch - 1))}
              color="bg-red-100 text-red-600 hover:bg-red-200"
            >
              −
            </ActionBtn>

            <ActionBtn
              onClick={() => setStretch(Math.min(5, stretch + 1))}
              color="bg-purple-100 text-purple-600 hover:bg-purple-200"
            >
              + Stretch
            </ActionBtn>
          </div>
        </Card>

        <Card title="Sleep" value={`${sleep} hrs`} icon="😴">
          <div className="h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-indigo-400 to-indigo-600"
              style={{ width: `${(sleep / 9) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <ActionBtn
              onClick={() => setSleep(Math.max(0, sleep - 0.5))}
              color="bg-red-100 text-red-600 hover:bg-red-200"
            >
              −
            </ActionBtn>

            <ActionBtn
              onClick={() => setSleep(Math.min(12, sleep + 0.5))}
              color="bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
            >
              + Sleep
            </ActionBtn>
          </div>
        </Card>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Burnout */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-md hover:shadow-xl transition">
          <h3 className="font-semibold text-gray-700">🔥 Burnout Risk</h3>

          <div className="h-3 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
              style={{ width: `${burnout}%` }}
            />
          </div>

          <p className="mt-2 text-sm font-semibold text-gray-600">
            {burnout}% risk level
          </p>

          <p
            className={`text-xs mt-2 font-medium ${
              burnout < 30
                ? "text-green-600"
                : burnout < 60
                  ? "text-yellow-600"
                  : "text-red-600"
            }`}
          >
            {burnout < 30
              ? "Excellent health habits 🚀"
              : burnout < 60
                ? "Take a few breaks today ⚡"
                : "High burnout risk. Rest recommended 🔥"}
          </p>
        </div>

        {/* Posture */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-md flex flex-col items-center justify-center hover:shadow-xl transition">
          <h3 className="font-semibold mb-3">🪑 Posture Detection</h3>

          <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            📷 Camera Off
          </div>

          <button className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold hover:scale-105 transition">
            Start Detection
          </button>
        </div>

        {/* Reminders */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-md hover:shadow-xl transition">
          <h3 className="font-semibold mb-3">⏰ Reminders</h3>

          <div className="space-y-3 text-sm">
            {["Water Break", "Eye Rest (20-20-20)", "Stretch Break"].map(
              (item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-gray-600">{item}</span>
                  <input type="checkbox" className="accent-blue-500 w-4 h-4" />
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* SCREEN TIME */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-md">
        <h3 className="font-semibold mb-4">📊 Screen Time</h3>

        <div className="grid grid-cols-7 gap-3 text-center text-xs">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <div key={i} className="hover:scale-105 transition">
              <div className="h-24 bg-gradient-to-t from-blue-500 to-blue-300 rounded-xl shadow-sm"></div>
              <p className="mt-2 text-gray-600">{day}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-3">
          Daily average: 8.5h • Recommended: 6–8h
        </p>
      </div>
    </div>
  );
};

export default Health;
