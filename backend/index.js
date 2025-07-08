const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// === Store Latest Command ===
let currentCommand = "stop";

// === Route: Receive frontend command ===
app.post('/control', (req, res) => {
  const { command } = req.body;
  console.log("🖐️ Frontend sent command:", command);
  currentCommand = command;  // Save latest command
  res.json({ success: true, message: `Command set to ${command}` });
});

// === Route: Pico polls for command ===
app.get('/iot', (req, res) => {
  console.log("📡 Pico requested command:", currentCommand);
  res.json({ command: currentCommand });
});

// === Test Route ===
app.get('/', (req, res) => {
  res.send('✅ IoT Backend is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
