import { useEffect, useState } from "react";

function App() {
  const [rotation, setRotation] = useState({
    seconds: 0,
    minute: 0,
    hour: 0,
  });

  useEffect(() => {
    const updateRotation = () => {
      const time = new Date();
      const seconds = time.getSeconds() * 6; // 360 degrees / 60 seconds
      const minute = time.getMinutes() *6 + time.getSeconds() * 0.1; // Include second-based adjustment
      const hour = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5; // Include minute-based adjustment

      setRotation({ seconds, minute, hour });
    };

    updateRotation(); // Initial call to set correct time
    const interval = setInterval(updateRotation, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {/* Clock Face */}
      <div className="h-96 w-96 border border-gray-500 rounded-full relative">
        {/* Hour Numbers */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">12</div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">6</div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">9</div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">3</div>

        {/* Second Hand */}
        <div
          className="absolute w-full h-full flex justify-center "
          style={{
            transform: `rotate(${rotation.seconds}deg)`,
            transformOrigin: "50% 50%",
          }}
        >
          <div className="w-1 h-[54%] bg-red-500"></div>
        </div>

        {/* Minute Hand */}
        <div
          className="absolute w-full h-full flex justify-center"
          style={{
            transform: `rotate(${rotation.minute}deg)`,
            transformOrigin: "50% 50%",
          }}
        >
          <div className="w-2 h-[54%] bg-blue-500"></div>
        </div>

        {/* Hour Hand */}
        <div
          className="absolute w-full h-full flex justify-center"
          style={{
            transform: `rotate(${rotation.hour}deg)`,
            transformOrigin: "50% 50%",
          }}
        >
          <div className="w-3 h-[54%] bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
