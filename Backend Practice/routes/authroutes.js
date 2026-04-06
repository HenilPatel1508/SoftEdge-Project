const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

router.post("/register",async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        console.log("Body : ",req.body);
        

        const hashedpassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashedpassword,
        });
        res.json(user);
    }catch(err){
        res.status(500).json(err.message)
    }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid password");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports=router;
