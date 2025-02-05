import { useEffect, useState } from "react";

const UserTimeDisplay = ({ username, email }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-1 rounded-xl shadow-md w-64">
      <h2 className="text-lg font-semibold">Hola, {username} 👋</h2>
      <p className="text-sm text-gray-300">{email}</p>
      <p className="text-2xl font-bold mt-2">{time.toLocaleTimeString()}</p>
    </div>
  );
};

export default UserTimeDisplay;
