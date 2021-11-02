/* eslint-disable no-unused-vars */
import { useState } from 'react';

export interface ModalUser {
  avatarUri: string;
  instaName: string;
}

export interface ModalEvaluation {
  rate: number;
  message: string;
}

interface ReturnType {
  isVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsVisible: (isVisible: boolean) => void;
  modalUser: ModalUser;
  setModalUser: (modalUser: ModalUser) => void;
  evaluation: ModalEvaluation;
  setEvaluation: (evaluation: ModalEvaluation) => void;
}

export function useEvaluationModal(): ReturnType {
  const [isVisible, setIsVisible] = useState(false);

  const [modalUser, setModalUser] = useState<ModalUser>({} as ModalUser);
  const [evaluation, setEvaluation] = useState<ModalEvaluation>(
    {} as ModalEvaluation,
  );

  return {
    isVisible,
    setIsVisible,
    modalUser,
    setModalUser,
    evaluation,
    setEvaluation,
  };
}
