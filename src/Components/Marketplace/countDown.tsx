import { useEffect, useState } from 'react';

const useCountdown = (targetTime: number) => {
  const nowTime = +new Date()
  const [countDown, setCountDown] = useState((targetTime - nowTime) / 1000);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((targetTime - (+new Date())) / 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown]);
  return getReturnValues(Number(countDown));
};

const getReturnValues = (countDown: number) => {
  const days = parseInt((countDown / 60 / 60 / 24).toString())
  const hours = parseInt((countDown / 60 / 60 % 24).toString())
  const minutes = parseInt((countDown / 60 % 60).toString())
  const seconds = parseInt((countDown % 60).toString())
  return [days, hours, minutes, seconds]
};

export { useCountdown };




