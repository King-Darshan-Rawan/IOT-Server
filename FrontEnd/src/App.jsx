import React from "react";
import ControlPanel from "./components/ControlPanel";
import OutputScreen from "./components/OutputScreen";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Topbar */}
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">RC Car Control</h1>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col lg:flex-row gap-4">
        {/* Left: Control Panel */}
        <div className="lg:w-1/3 flex justify-center items-center">
          <ControlPanel />
        </div>

        {/* Right: Output Screen */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-end gap-2 mb-2">
            <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded">
              Start Video Stream
            </button>
            <button className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded">
              Stop Video Stream
            </button>
          </div>
          <OutputScreen />
        </div>
      </main>
    </div>
  );
}

export default App;
