# Gmail Hello Agent

## Overview
A Node.js agent that sends a "Hello!" email to any recipient address the user provides.

## Setup
1. Add your Gmail credentials to `.env`:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   ```
2. Install dependencies: `npm install`

## Running
```bash
npm start
```
The agent prompts for a recipient email, sends a hello message, and loops until the user types `quit`.

## Tech Stack
- **Node.js** with CommonJS modules
- **Nodemailer** — sends email via Gmail SMTP
- **dotenv** — loads credentials from `.env`

## Project Structure
- `agent.js` — main agent script (entry point)
- `.env` — Gmail credentials (not committed)
- `package.json` — dependencies and `start` script
