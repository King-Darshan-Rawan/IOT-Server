const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// IoT Device Config (change IP & Port)
const IOT_DEVICE_IP = process.env.IOT_DEVICE_IP || '192.168.1.11';
const IOT_PORT = process.env.IOT_PORT || 8080;


// Route: Receive frontend command & forward to IoT
app.post('/control', async (req, res) => {
  const { command } = req.body;
  console.log("Frontend sent command:", command);

  // Build IoT API URL
  const iotURL = `http://${IOT_DEVICE_IP}:${IOT_PORT}/${command}`;
  console.log("👉 Full IoT URL:", iotURL);


  try {
    const response = await axios.get(iotURL);
    console.log("IoT Device responded:", response.data);
    res.json({ success: true, message: response.data });
  } catch (error) {
    console.error("IoT Device error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('IoT Backend is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
