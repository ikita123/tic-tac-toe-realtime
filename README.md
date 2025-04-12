## 🎮 Real-Time Tic-Tac-Toe Game

A real-time multiplayer Tic-Tac-Toe game built with **React.js**, **Node.js**, **Express**, and **Socket.io**.

### 🎥 Demo Video

Watch the gameplay and setup walkthrough in this Loom video:

[![Tic-Tac-Toe Demo]](https://www.loom.com/share/a90e18a548984da39d5319407ed88bde)

### 📦 Tech Stack

**Frontend:**

- React.js
- Socket.io-client
- Canvas-confetti
- CSS

**Backend:**

- Node.js
- Express.js
- Socket.io
- CORS

### 📁 Project Structure

client/ # Frontend (React)

server/ # Backend (Node.js + Express)

---

### ⚙️ Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tic-tac-toe-realtime.git
cd tic-tac-toe-realtime
```

2. Install Backend Dependencies
   cd server
   npm install

3. Start Backend Server
   npm run dev

4. Install Frontend Dependencies
   cd client
   npm install

5. Start React App
   npm start

   App runs on http://localhost:3000

# Implemented Features

Real-time multiplayer Tic-Tac-Toe

Confetti animation for wins

In-app messages (waiting for opponent, draw, etc.)

Scoreboard tracking wins

Game reset functionality

Room-full handling

Graceful disconnect handling

Mobile-responsive design
