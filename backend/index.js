const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

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

  // Send to all connected WebSocket clients (Picos)
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(command);
    }
  });

  res.json({ success: true, message: `Command set to ${command}` });
});

// === Route: Pico polls for command (for backward compatibility) ===
app.get('/iot', (req, res) => {
  console.log("📡 Pico requested command:", currentCommand);
  res.json({ command: currentCommand });
});

// === Test Route ===
app.get('/', (req, res) => {
  res.send('✅ IoT Backend with WebSocket is running...');
});

// Create HTTP server
const server = http.createServer(app);

// === WebSocket Server ===
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log("🔌 Pico connected via WebSocket");

  ws.send(currentCommand); // Send latest command on connection

  ws.on('message', (message) => {
    console.log("📨 Message from Pico:", message);
  });

  ws.on('close', () => {
    console.log("❌ Pico disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  console.log(`🌐 WebSocket running at ws://localhost:${PORT}`);
});
