import { useState, useEffect } from "react";

function expirationCountdown(expiryDate) {
  const msLeft = expiryDate - Date.now();
  const secondsLeft = msLeft / 1000;
  const minutesLeft = secondsLeft / 60;
  const hoursLeft = minutesLeft / 60;

  const hoursDisp = Math.floor(hoursLeft);
  const minutesDisp = Math.floor(minutesLeft % 60);
  const secondsDisp = Math.floor(secondsLeft % 60);

  if (hoursDisp <= 0 && minutesDisp <= 0 && secondsDisp <= 0) {
    return "EXPIRED";
  }

  return `${hoursDisp}h ${minutesDisp}m ${secondsDisp}s`;
}

function CountdownRenderer({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState(() =>
    expirationCountdown(expiryDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(expirationCountdown(expiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
}

export default CountdownRenderer;
