const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, port } = process.env;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });





mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));



app.use(
  cors({
    origin: ["http://localhost:3000", "https://tvlorenzo.netlify.app", "https://checking-out.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});