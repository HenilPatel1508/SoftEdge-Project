const express = require('express')
const {  mongoose } = require('mongoose')
const cors = require("cors");
const app = express();
const port = 3000
const authroutes = require("./routes/authroutes")
const authMiddleware = require("./middleware/authmiddleware");
require("dotenv").config();

app.use(express.json());
app.use(cors())

app.use("/api/auth",authroutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected Route", user: req.user });
});

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))