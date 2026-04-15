import User from "../models/userModel.js";
import Session from "../models/sessionModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { VerifyEmail } from "../config/nodemailer.js";
import "dotenv/config"

// export const register = async (req, res) => {
//   try {
//     const { firstname, lastname, email, password } = req.body;
//     if (!firstname || !lastname || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       firstname,
//       lastname,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     console.log("JWT:", process.env.JWT_SECRET);

//     try {
//       await VerifyEmail(email, token);
//     } catch (mailError) {
//       console.error("Email Error:", mailError);
//     }
//     newUser.token = token;
//     await newUser.save();

//     res
//       .status(201)
//       .json({ message: "User registered successfully", user: newUser , token});
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    newUser.token = token;
    await newUser.save();

    try {
      await VerifyEmail(email, token);
    } catch (err) {
      console.error("Email error:", err);
    }

    res.status(201).json({
      message: "User registered successfully",
      token, // ✅ MUST return this
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// export const verify = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).json({ message: "Authorization header missing" });
//     }

//     const token = authHeader.split(" ")[1];
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     user.token = null;
//     user.isVerified = true;
//     await user.save();
//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT ERROR:", err.message);
      return res.status(401).json({ message: err.message });
    }

    const user = await User.findById(decoded.id);

    // 🔥 CRITICAL FIX
    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    user.token = null;
    user.isVerified = true;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// export const reverify = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     if (user.isVerified) {
//       return res.status(400).json({ message: "Email is already verified" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     VerifyEmail(email, token);
//     user.token = token;
//     await user.save();
//     res.status(200).json({ message: "Verification email sent successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const reverify = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Already verified" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    user.token = token;
    await user.save();

    await VerifyEmail(email, token);

    res.status(200).json({ message: "Verification email sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existinguser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!existinguser.isVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    //Generate JWT token
    const asscessToken = jwt.sign({ id: existinguser._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    const refreshToken = jwt.sign({ id: existinguser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    
    existinguser.token = asscessToken;
    existinguser.isLogedin=true
    await existinguser.save();

    const existingsession = await Session.findOne({ userId: existinguser._id });
    if (existingsession) {
      await Session.deleteOne({ userId: existinguser._id });
    }
    await Session.create({ userId: existinguser._id });
    res.status(200).json({
      message: `Login successful ${existinguser.firstname}`,
      user: existinguser,
      token: asscessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req,res)=>{
  try {
    const userId = req.id
    await Session.deleteMany({userId:userId})
    await User.findByIdAndUpdate(userId,{isLogedin:false})
    return res.status(200).json({
      success:true,
      message:"User Logedout Successfully"
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
