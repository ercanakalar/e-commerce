import { useCallback, useEffect, useRef, useState } from 'react';

import { CountdownProps, ICountdown } from '../type/hooks/useCountDown-type';

const useCountdown = ({
  seconds,
  autoStart = false,
  onEnd,
  format = 'mm:ss',
}: CountdownProps): ICountdown => {
  const [countdown, setCountdown] = useState(seconds);
  const [running, setRunning] = useState(autoStart);
  const [remainingTime, setTime] = useState<string>('');
  const [ended, setEnded] = useState(false);
  const interval = useRef<any>(null);

  useEffect(() => {
    if (running && !ended && countdown === 0 && onEnd) {
      setEnded(true);
      setRunning(false);
      onEnd();
    }
  }, [countdown, ended, onEnd, running]);

  const decreaseCountdown = useCallback(() => {
    if (countdown > 0 && running) {
      const newCountdown = countdown - 1;
      const hours = Math.floor(newCountdown / 3600)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor((newCountdown % 3600) / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (newCountdown % 60).toString().padStart(2, '0');
      setTime(
        format
          .replace('hh', hours)
          .replace('mm', minutes)
          .replace('ss', seconds)
      );
      setCountdown(newCountdown);
    }
  }, [countdown, format, running]);

  useEffect(() => {
    interval.current = setInterval(() => decreaseCountdown(), 1000);
    return () => clearInterval(interval.current);
  }, [decreaseCountdown]);

  return {
    ended,
    remainingDuration: countdown,
    remainingTime,
    start: () => setRunning(true),
    pause: () => setRunning(false),
    reset: () => {
      setEnded(false);
      setCountdown(seconds);
      setRunning(false);
    },
  };
};

export { useCountdown };
