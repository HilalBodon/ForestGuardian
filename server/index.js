require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const deviceRoutes = require("./routes/devices");
const notificationRoutes = require("./routes/notifications");
// const soundsRoutes = require("./routes/sounds");

const mongoose = require("mongoose");

// const userSchema = require('./models/user');


app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/devices", deviceRoutes);

app.use("/api/notifications", notificationRoutes);

// app.use("/api/sounds", soundsRoutes);


mongoose.set('strictQuery', true);//to avoid warning

const CONNECTION_URL = process.env.DB;
const PORT = process.env.PORT ||8080;

app.listen (console.log(`Listening on port ${PORT}...`));

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})//second parameter is not required just for avoid some warnings
    .then(()=> app.listen(PORT,()=>console.log(`server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));
