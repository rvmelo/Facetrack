import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

interface ReturnType {
  display: boolean;
}

export function useRateModal(): ReturnType {
  const [display, setDisplay] = useState(true);

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
  };
}
