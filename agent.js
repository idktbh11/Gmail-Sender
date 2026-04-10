require("dotenv").config();
const nodemailer = require("nodemailer");
const readline = require("readline");
const path = require("path");

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function sendHelloEmail(to) {
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

  const mailOptions = {
    from: GMAIL_USER,
    to,
    subject: "Hello!",
    html: '<p>Hello! This is an automated message from the Gmail Agent.</p><br><img src="cid:logo" width="150" />',
    attachments: [
      {
        filename: "logo.jpg",
        path: path.join(__dirname, "chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg"),
        cid: "logo",
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent to ${to} (Message ID: ${info.messageId})`);
}

async function main() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error(
      "Missing credentials. Set GMAIL_USER and GMAIL_APP_PASSWORD in your .env file."
    );
    process.exit(1);
  }

  console.log("=== Gmail Hello Agent ===\n");

  while (true) {
    const email = await ask('Enter recipient email (or "quit" to exit): ');

    if (!email || email.toLowerCase() === "quit") {
      console.log("Goodbye!");
      rl.close();
      break;
    }

    try {
      await sendHelloEmail(email.trim());
    } catch (err) {
      console.error(`Failed to send: ${err.message}`);
    }
  }
}

main();
