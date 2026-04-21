import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const VerifyEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfigurations = {
    // It should be a string of sender/server email
    from: process.env.MAIL_USER,

    to: email,

    // Subject of Email
    subject: "Email Verification",

    // This would be the text of email body
    html: `    <div style="margin:0; padding:0; background:#f4f6fb; font-family:Arial, sans-serif;">
      
      <!-- Wrapper -->
      <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
        
        <!-- Header (Brand) -->
        <div style="background:linear-gradient(to right, #4f46e5, #06b6d4); padding:20px; text-align:center;">
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" width="50" alt="logo" />
          <h2 style="color:white; margin:10px 0 0;">E-commerce</h2>
        </div>

        <!-- Body -->
        <div style="padding:30px; text-align:center;">
          <h2 style="color:#111;">Verify Your Email</h2>

          <p style="color:#555; font-size:16px;">
            Welcome to <b>E-commerce</b> 🎉<br/>
            Please confirm your email address to start shopping amazing deals.
          </p>

          <!-- Button -->
          <a href="http://localhost:5173/verify/${token}" 
             style="display:inline-block; margin-top:20px; padding:14px 28px; 
             background:linear-gradient(to right, #4f46e5, #06b6d4); 
             color:white; text-decoration:none; border-radius:8px; font-weight:bold;">
             Verify Email
          </a>
        </div>

        <!-- Footer -->
        <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#777;">
          © 2026 E-commerce. All rights reserved.<br/>
          Made with ❤️ for shopping lovers
        </div>

      </div>
    </div>`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
};
