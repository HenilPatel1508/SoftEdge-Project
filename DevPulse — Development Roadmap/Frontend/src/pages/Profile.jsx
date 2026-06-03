import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCamera, FaCheckCircle, } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { FaFire, FaSun, FaMoon, FaBug, FaCode, FaUsers } from "react-icons/fa";
const Profile = () => {
  const token = localStorage.getItem("token"); // 👈 JWT token

  // ================= PROFILE DATA =================
  const [profile, setProfile] = useState({
    name: "",
    role: "" || "Developer",
    email: "",
    location: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);

  // input change handler
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SKILLS =================
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() === "") return;
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  // ================= BADGES =================

  const badgeIcons = {
    streak: FaFire,
    earlyBird: FaSun,
    nightOwl: FaMoon,
    bugHunter: FaBug,
    ninja: FaCode,
    teamPlayer: FaUsers,
  };
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
  const { theme, setTheme, themeColors } = useTheme();
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);
  // ================= FETCH PROFILE (API) =================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data.user;

      setProfile({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "Developer",
        location: user.location || "",
        bio: user.bio || "",
      });

      setSkills(user.skills || []);
    } catch (err) {
      console.log("PROFILE FETCH ERROR:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= UPDATE PROFILE (API) =================
  const updateProfile = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: profile.name,
          role: profile.role,
          email: profile.email,
          location: profile.location,
          bio: profile.bio,
          skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Profile Updated Successfully");
      console.log(res.data);
    } catch (err) {
      console.log("UPDATE ERROR:", err.message);
      alert("Update Failed");
    }
  };

 if (loading) {
  return (
    <div className="p-6 space-y-6 animate-pulse">

      {/* HEADER SKELETON */}
      <div className="space-y-2">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="h-4 w-72 bg-gray-200 rounded"></div>
      </div>

      {/* PROFILE + FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT CARD */}
        <div className="h-60 bg-gray-200 rounded-2xl"></div>

        {/* FORM */}
        <div className="md:col-span-2 space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-40 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* BADGES */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
          ))}
      </div>
    </div>
  );
}

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
                ?.split(" ")
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
              placeholder="Name"
              value={profile.name}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              name="role"
              placeholder="Role"
              value={profile.role}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />

            <input
              name="location"
              placeholder="Location"
              value={profile.location}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>

          <textarea
            name="bio"
            placeholder="Bio"
            value={profile.bio}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full mt-4 h-28"
          />

          {/* 🔥 API SAVE BUTTON */}
          <button
            onClick={updateProfile}
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

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm text-center">
          {Object.keys(badges).map((key) => {
            const Icon = badgeIcons[key];

            return (
              <div
                key={key}
                onClick={() => toggleBadge(key)}
                className={`p-3 rounded-xl cursor-pointer flex flex-col items-center gap-2 transition ${
                  badges[key]
                    ? "bg-yellow-50 text-black"
                    : "bg-gray-50 text-gray-400"
                }`}
              >
                {Icon && <Icon className="text-lg" />}

                <span className="capitalize">{key}</span>
              </div>
            );
          })}
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
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}
                <FaTimes
                  onClick={() =>
                    setSkills((prev) => prev.filter((_, index) => index !== i))
                  }
                />
              </span>
            ))}

            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="border px-2 py-1 rounded"
              placeholder="Add skill"
            />

            <button onClick={addSkill} className="border px-3 py-1 rounded">
              Add
            </button>
          </div>
        </div>

        {/* THEME */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-semibold mb-3">🎨 Theme</h3>

          <div className="grid grid-cols-3 gap-2">
            {Object.keys(themeColors).map((c) => (
              <div
                key={c}
                onClick={() => setTheme(c)}
                className={`h-8 rounded cursor-pointer ${
                  theme === c ? "ring-2 ring-black" : ""
                } ${themeColors[c].split(" ")[0]}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
