import { useState } from 'react';

interface ReturnType {
  introModalVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setIntroModalVisible: (value: boolean) => void;
}

export function useIntroModal(): ReturnType {
  const [introModalVisible, setIntroModalVisible] = useState(true);

  return {
    introModalVisible,
    setIntroModalVisible,
  };
}
