import { useState, useEffect } from 'react';
import { timeRemaining } from '../Utils/formatters';

export const useAuctionTimer = (endTime) => {
  const [timeLeft, setTimeLeft] = useState(timeRemaining(endTime));
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = timeRemaining(endTime);
      setTimeLeft(newTime);
      if (newTime === 'Ended') {
        setEnded(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return { timeLeft, ended };
};