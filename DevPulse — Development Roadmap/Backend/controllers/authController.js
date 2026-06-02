import supabase from "../config/supabaseClient.js";
import transporter from "../config/mailer.js";
import generateOtp from "../utils/generateOtp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ check existing user first
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (findError) throw findError;

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 2️⃣ generate OTP
    const otp = generateOtp().toString();

    // 3️⃣ hash password
    const hashedPassword = await bcrypt.hash(password, 10);
const otp_expiry = Date.now() + 10 * 60 * 1000;
    // 4️⃣ insert user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          otp,
          otp_expiry,
          is_verified: false,
        },
      ])
      .select();

    if (error) throw error;

    console.log("USER CREATED =>", data);

    // 5️⃣ send email OTP
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify OTP",
      html: `
        <h2>DevPulse OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

    // 6️⃣ response
    return res.status(201).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {
    console.error("REGISTER ERROR =>", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ❗ force string compare
    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await supabase
      .from("users")
      .update({
        is_verified: true,
        otp: null,
      })
      .eq("email", email);

    return res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
    console.log(err.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("LOGIN API HIT");
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // if (!user.is_verified) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please verify OTP first",
    //   });
    // }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    console.log("DB Password:", user.password);
    console.log("Entered Password:", password);
    // 🔥 CREATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = generateOtp().toString();

    // save OTP in DB
    await supabase.from("users").update({ otp }).eq("email", email);

    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password OTP",
      html: `
<div style="
  font-family: Arial, sans-serif;
  background: #0f172a;
  padding: 40px;
  text-align: center;
">

  <div style="
    max-width: 500px;
    margin: auto;
    background: #111827;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(0,0,0,0.4);
  ">

    <h1 style="color: #38bdf8; margin-bottom: 10px;">
      DevPulse 🔐
    </h1>

    <h2 style="color: #ffffff;">
      Email Verification
    </h2>

    <p style="color: #9ca3af; font-size: 14px;">
      Use the OTP below to verify your account
    </p>

    <div style="
      margin: 25px 0;
      font-size: 32px;
      letter-spacing: 8px;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(90deg, #06b6d4, #3b82f6);
      padding: 15px;
      border-radius: 10px;
      display: inline-block;
    ">
      ${otp}
    </div>

    <p style="color: #9ca3af; font-size: 12px;">
      This OTP will expire in 10 minutes.
    </p>

    <hr style="border: 0.5px solid #374151; margin: 20px 0;" />

    <p style="color: #6b7280; font-size: 12px;">
      If you didn’t request this, ignore this email.
    </p>

  </div>
</div>
`,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { error } = await supabase
      .from("users")
      .update({
        password: hashedPassword,
        otp: null,
      })
      .eq("email", email);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = generateOtp().toString();

    await supabase.from("users").update({ otp }).eq("email", email);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Resend OTP",
      html: `
        <h2>New OTP</h2>
        <h1>${otp}</h1>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const faceLogin = async (req, res) => {
  try {
    const { email, image } = req.body;

    if (!email || !image) {
      return res.status(400).json({
        success: false,
        message: "Email and image required",
      });
    }

    // 1. Get user from DB
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. CHECK FACE (simple version)
    // 👉 if you DON'T have ML model yet, temporarily allow match flag
    const isFaceMatched = true; // later replace with real face compare

    if (!isFaceMatched) {
      return res.status(401).json({
        success: false,
        message: "Face not matched",
      });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      success: true,
      message: "Face login successful",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
