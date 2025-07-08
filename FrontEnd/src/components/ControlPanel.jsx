import React, { useState } from "react";
import axios from "axios";

function ControlPanel() {
  const [active, setActive] = useState("");

  const sendCommand = async (btn) => {
    setActive(btn);
    try {
      await axios.post("/control", { command: btn });
      console.log(`Sent command: ${btn}`);
    } catch (err) {
      console.error("Failed to send command:", err.message);
    }
  };

  const handlePress = (btn) => {
    sendCommand(btn);
  };

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
      <button
        className={btnClass("forward-left")}
        onMouseDown={() => handlePress("forward-left")}
        onMouseUp={handleRelease}
        onTouchStart={() => handlePress("forward-left")}
        onTouchEnd={handleRelease}
      >
        ↖️
      </button>
      <button
        className={btnClass("forward")}
        onMouseDown={() => handlePress("forward")}
        onMouseUp={handleRelease}
        onTouchStart={() => handlePress("forward")}
        onTouchEnd={handleRelease}
      >
        ⬆️
      </button>
      <button
        className={btnClass("forward-right")}
        onMouseDown={() => handlePress("forward-right")}
        onMouseUp={handleRelease}
        onTouchStart={() => handlePress("forward-right")}
        onTouchEnd={handleRelease}
      >
        ↗️
      </button>

      <button
        className={btnClass("left")}
        onMouseDown={() => handlePress("left")}
        onMouseUp={handleRelease}
        onTouchStart={() => handlePress("left")}
        onTouchEnd={handleRelease}
      >
        ⬅️
      </button>
      <button
        className={btnClass("stop")}
        onClick={() => sendCommand("stop")}
      >
        🛑
      </button>
      <button
        className={btnClass("right")}
        onMouseDown={() => handlePress("right")}
        onMouseUp={handleRelease}
        onTouchStart={() => handlePress("right")}
        onTouchEnd={handleRelease}
      >
        ➡️
      </button>

      <button
        className={btnClass("backward-left")}
        onMouseDown={() => handlePress("backward-left")}
        onMouseUp={handleRelease}
        onTouchStart={() => handlePress("backward-left")}
        onTouchEnd={handleRelease}
      >
        ↙️
      </button>
      <button
        className={btnClass("backward")}
        onMouseDown={() => handlePress("backward")}
        onMouseUp={handleRelease}
        onTouchStart={() => handlePress("backward")}
        onTouchEnd={handleRelease}
      >
        ⬇️
      </button>
      <button
        className={btnClass("backward-right")}
        onMouseDown={() => handlePress("backward-right")}
        onMouseUp={handleRelease}
        onTouchStart={() => handlePress("backward-right")}
        onTouchEnd={handleRelease}
      >
        ↘️
      </button>
    </div>
  );
}

export default ControlPanel;
