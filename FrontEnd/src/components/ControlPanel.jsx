import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://iot-server-1-8qfl.onrender.com/control";

function ControlPanel() {
  const [active, setActive] = useState("");

  const sendCommand = async (btn) => {
    setActive(btn);
    try {
      await axios.post(BACKEND_URL, { command: btn });
      console.log(`✅ Sent command: ${btn}`);
    } catch (err) {
      console.error("❌ Failed to send command:", err.message);
    }
  };

  const handlePress = (btn) => sendCommand(btn);
  const handleRelease = () => {
    sendCommand("stop");
    setActive("");
  };

  const btnClass = (btn) =>
    `w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center 
    bg-gray-700 text-white text-2xl font-bold 
    ${active === btn ? "bg-blue-500" : "hover:bg-gray-600"} 
    transition-all`;

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3">
      {[
        ["forward-left", "↖️"],
        ["forward", "⬆️"],
        ["forward-right", "↗️"],
        ["left", "⬅️"],
        ["stop", "🛑"],
        ["right", "➡️"],
        ["backward-left", "↙️"],
        ["backward", "⬇️"],
        ["backward-right", "↘️"]
      ].map(([cmd, icon]) => (
        <button
          key={cmd}
          className={btnClass(cmd)}
          onMouseDown={() => cmd !== "stop" && handlePress(cmd)}
          onMouseUp={handleRelease}
          onTouchStart={() => cmd !== "stop" && handlePress(cmd)}
          onTouchEnd={handleRelease}
          onClick={cmd === "stop" ? () => sendCommand("stop") : undefined}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}

export default ControlPanel;
