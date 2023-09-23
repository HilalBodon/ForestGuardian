// const express = require("express");
// const router = express.Router();


// router.post('/', (req, res) => {
//     const { recipientEmail, subject, message } = req.body;
  
//     const mailOptions = {
//       from: 'hilal.bodon@gmail.com',
//       to: recipientEmail,
//       subject: subject,
//       text: message,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ message: 'Error sending email' });
//       } else {
//         console.log('Email sent:', info.response);
//         res.status(200).json({ message: 'Email sent successfully' });
//       }
//     });
//   });

//   module.exports = router;

  
