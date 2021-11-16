import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

interface ReturnType {
  display: boolean;
  // eslint-disable-next-line no-unused-vars
  setMessage: (message: string) => void;
  message: string;
  // eslint-disable-next-line no-unused-vars
  setRate: (rate: number) => void;
  rate: number;
}

export function useRateModal(): ReturnType {
  const [display, setDisplay] = useState(true);
  const [message, setMessage] = useState('');

  const [rate, setRate] = useState(0);

  useEffect(() => {
    const keyBoardListener = Keyboard.addListener('keyboardDidShow', () => {
      setDisplay(false);
    });

    return () => {
      keyBoardListener.remove();
    };
  }, []);

  useEffect(() => {
    const keyBoardListener = Keyboard.addListener('keyboardDidHide', () => {
      setDisplay(true);
    });

    return () => {
      keyBoardListener.remove();
    };
  }, []);

  return {
    display,
    message,
    setMessage,

    setRate,
    rate,
  };
}
