require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = 3000;

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/send", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await transporter.sendMail({
      from: GMAIL_USER,
      to: email,
      subject: "Hello!",
      html: '<p>Hello! This is an automated message from the Gmail Agent.</p><br><img src="cid:logo" width="150" />',
      attachments: [
        {
          filename: "logo.jpg",
          path: path.join(__dirname, "chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg"),
          cid: "logo",
        },
      ],
    });

    res.json({ success: true, message: `Email sent to ${email}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
