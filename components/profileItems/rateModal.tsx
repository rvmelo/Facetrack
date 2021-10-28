import React, { memo } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import {
  CenteredView,
  InputContainer,
  RateModalText,
  ModalUserInfoContainer,
  RateModalInput,
} from './styles';

// components
import { ModalButton } from './modalButton';
import { CloseButton } from './closeButton';
import Avatar from '../avatar/index';
import { ButtonPanel } from './buttonPanel';

//  constants
import Colors from '../../constants/colors';
import { useRateModal } from './hooks/useRateModal';

interface ModalComponentProps {
  modalVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setModalVisible: (value: boolean) => void;
  rate: number;
  // eslint-disable-next-line no-unused-vars
  setRate: (value: number) => void;
  userData: {
    avatarUri: string;
    instaName: string | undefined;
  };
  // eslint-disable-next-line no-unused-vars
  handleEvaluation: (value: number) => void;
}

export const RateModal: React.FC<ModalComponentProps> = memo(
  ({
    modalVisible,
    setModalVisible,
    rate,
    setRate,
    userData,
    handleEvaluation,
  }) => {
    const { avatarUri, instaName } = userData;
    const { display } = useRateModal();

    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <CenteredView>
          <View style={styles.modalView}>
            <ModalUserInfoContainer>
              <Avatar avatar={avatarUri} />
              <RateModalText>@{instaName}</RateModalText>
            </ModalUserInfoContainer>
            {display && <ButtonPanel rate={rate} setRate={setRate} />}

            <InputContainer>
              <RateModalInput />
            </InputContainer>
            {display && <ModalButton onPress={() => handleEvaluation(rate)} />}
          </View>
          {display && (
            <CloseButton
              styles={{ marginTop: 20 }}
              onPress={() => setModalVisible(false)}
            />
          )}
        </CenteredView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: Colors.accent,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
