const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Body : ", req.body);

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const refreshTokens = jwt.sign({ id: user._id }, process.env.Re_token, {
      expiresIn: "30d",
    });

    user.refreshTokens.push(refreshTokens);
    await user.save();

    res.json({ token,refreshTokens });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json("Refresh token required");
  }

  try {
    // ✅ Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.Re_token);

    const user = await User.findById(decoded.id);

    // 🔥 Check token in DB
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Invalid refresh token");
    }

    // 🔥 Generate new access token
    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });

  } catch {
    res.status(403).json("Invalid or expired refresh token");
  }
});

module.exports = router;
