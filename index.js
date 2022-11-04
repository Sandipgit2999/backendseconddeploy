const express = require("express");
const { connection } = require("./db");
const app = express();
require("dotenv").config();
app.use(express.json());
const { Usercontroller } = require("./Routes/User.route");
const { Notecontroller } = require("./Routes/Note.route");
const { authorization } = require("./Middlewares/Authorization");
const cors=require("cors")
const PORT = process.env.PORT|| 8080;

app.use(cors())
app.use("/user", Usercontroller);
app.use(authorization);
app.use("/notes", Notecontroller);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`listening on ${PORT}`);
  } catch (err) {
    console.log("some error in connection");
    console.log(err);
  }
});
