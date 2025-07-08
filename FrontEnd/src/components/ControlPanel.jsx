import React, { useState } from "react";

function ControlPanel() {
  const [active, setActive] = useState("");

  const handleClick = (btn) => {
    setActive(btn);
    setTimeout(() => setActive(""), 300); // Reset after 300ms
  };

  const btnClass = (btn) =>
    `w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center 
    bg-gray-700 text-white text-2xl font-bold 
    ${active === btn ? "bg-blue-500" : "hover:bg-gray-600"} 
    transition-all`;

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3">
      {/* Top Row */}
      <button className={btnClass("forward-left")} onClick={() => handleClick("forward-left")}>↖️</button>
      <button className={btnClass("forward")} onClick={() => handleClick("forward")}>⬆️</button>
      <button className={btnClass("forward-right")} onClick={() => handleClick("forward-right")}>↗️</button>

      {/* Middle Row */}
      <button className={btnClass("left")} onClick={() => handleClick("left")}>⬅️</button>
      <button className={btnClass("stop")} onClick={() => handleClick("stop")}>OK</button>
      <button className={btnClass("right")} onClick={() => handleClick("right")}>➡️</button>

      {/* Bottom Row */}
      <button className={btnClass("backward-left")} onClick={() => handleClick("backward-left")}>↙️</button>
      <button className={btnClass("backward")} onClick={() => handleClick("backward")}>⬇️</button>
      <button className={btnClass("backward-right")} onClick={() => handleClick("backward-right")}>↘️</button>
    </div>
  );
}

export default ControlPanel;
