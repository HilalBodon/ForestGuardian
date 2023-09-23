require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const deviceRoutes = require("./routes/devices");
const notificationRoutes = require("./routes/notifications");
const sendEmail = require("./utils/sendEmail");

const mongoose = require("mongoose");


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/devices", deviceRoutes);

app.use("/api/notifications", notificationRoutes);

app.post("/api/sendemail", async (req, res) => {
    const { email } = req.body;
  
    try {
      const send_to = email;
      const sent_from = process.env.EMAIL_USER;
      const reply_to = email;
      const subject = "Thank You Message From NodeCourse";
      const message = `
          <h3>Hello hilal</h3>
          <p>l mail wasel mn hon</p>
          <p>Regards...</p>
      `;
  
      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });





mongoose.set('strictQuery', true);//to avoid warning

const CONNECTION_URL = process.env.DB;
const PORT = process.env.PORT ||8080;

app.listen (console.log(`Listening on port ${PORT}...`));

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})//second parameter is not required just for avoid some warnings
    .then(()=> app.listen(PORT,()=>console.log(`server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));
