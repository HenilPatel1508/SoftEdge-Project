import React, { useState } from "react";
import { FaCamera, FaCheckCircle, FaFire, FaCode } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { themeColors } from "../theme/colors";

const Profile = () => {
  // ================= PROFILE DATA =================
  const [profile, setProfile] = useState({
    name: "John Doe",
    role: "Full Stack Developer",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    bio: "Passionate developer with 5+ years of experience building web applications. Love working with React, Node.js, and modern tech stack.",
  });

  // input change handler
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SKILLS =================
  const [skills, setSkills] = useState([
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Go",
    "Docker",
    "AWS",
    "MongoDB",
    "PostgreSQL",
  ]);

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() === "") return;
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  // ================= BADGES (TOGGLE) =================
  const [badges, setBadges] = useState({
    streak: true,
    earlyBird: true,
    nightOwl: true,
    bugHunter: false,
    ninja: true,
    teamPlayer: false,
  });

  const toggleBadge = (key) => {
    setBadges({ ...badges, [key]: !badges[key] });
  };

  // ================= THEME =================
  const [theme, setTheme] = useState("blue");

  const colors = ["blue", "purple", "green", "red", "orange", "pink"];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500">
          Manage your developer profile and preferences
        </p>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT PROFILE CARD */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm text-center relative">
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <button className="absolute bottom-0 right-0 bg-white border p-1 rounded-full shadow">
              <FaCamera className="text-gray-600 text-sm" />
            </button>
          </div>

          <h2 className="mt-4 font-semibold text-lg">{profile.name}</h2>
          <p className="text-gray-500 text-sm">{profile.role}</p>

          <div className="flex justify-center gap-2 mt-3">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Pro Member
            </span>

            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
              <FaCheckCircle /> Verified
            </span>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-semibold mb-4">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              placeholder="Full Name"
            />

            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              placeholder="Email"
            />

            <input
              name="role"
              value={profile.role}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              placeholder="Role"
            />

            <input
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              placeholder="Location"
            />
          </div>

          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full mt-4 h-28"
          />

          <button
            onClick={() => alert("Profile Saved (static demo)")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* BADGES */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <FaFire className="text-orange-500" /> Developer Badges
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-sm">
          <div
            onClick={() => toggleBadge("streak")}
            className={`p-3 rounded-xl cursor-pointer ${
              badges.streak ? "bg-yellow-50" : "bg-gray-50 text-gray-400"
            }`}
          >
            🔥 100 Day Streak
          </div>

          <div
            onClick={() => toggleBadge("earlyBird")}
            className={`p-3 rounded-xl cursor-pointer ${
              badges.earlyBird ? "bg-yellow-50" : "bg-gray-50 text-gray-400"
            }`}
          >
            🌅 Early Bird
          </div>

          <div
            onClick={() => toggleBadge("nightOwl")}
            className={`p-3 rounded-xl cursor-pointer ${
              badges.nightOwl ? "bg-yellow-50" : "bg-gray-50 text-gray-400"
            }`}
          >
            🦉 Night Owl
          </div>

          <div
            onClick={() => toggleBadge("bugHunter")}
            className={`p-3 rounded-xl cursor-pointer ${
              badges.bugHunter ? "bg-yellow-50" : "bg-gray-50 text-gray-400"
            }`}
          >
            🐛 Bug Hunter
          </div>

          <div
            onClick={() => toggleBadge("ninja")}
            className={`p-3 rounded-xl cursor-pointer ${
              badges.ninja ? "bg-yellow-50" : "bg-gray-50 text-gray-400"
            }`}
          >
            🥷 Code Ninja
          </div>

          <div
            onClick={() => toggleBadge("teamPlayer")}
            className={`p-3 rounded-xl cursor-pointer ${
              badges.teamPlayer ? "bg-yellow-50" : "bg-gray-50 text-gray-400"
            }`}
          >
            🤝 Team Player
          </div>
        </div>
      </div>

      {/* SKILLS + THEME */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TECH STACK */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FaCode /> Tech Stack
          </h3>

          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="group bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}

                <FaTimes
                  onClick={() =>
                    setSkills((prev) => prev.filter((_, index) => index !== i))
                  }
                  className="text-gray-400 hover:text-red-500 cursor-pointer text-xs opacity-0 group-hover:opacity-100 transition"
                />
              </span>
            ))}

            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="border px-2 py-1 rounded"
              placeholder="Add skill"
            />

            <button
              onClick={addSkill}
              className="border px-3 py-1 rounded text-gray-500"
            >
              Add
            </button>
          </div>
        </div>

        {/* THEME */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-semibold mb-3">🎨 Theme</h3>

          <p className="text-sm text-gray-500 mb-2">Accent Color</p>

          <div className="grid grid-cols-3 gap-2">
            {colors.map((c) => (
              <div
                key={c}
                onClick={() => setTheme(c)}
                className={`h-8 rounded cursor-pointer ${
                  theme === c ? "ring-2 ring-black" : ""
                } bg-${c}-500`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
