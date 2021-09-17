import React, { memo } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { CenteredView, ModalText, ModalUserInfoContainer } from './styles';

// components
import { ModalButton } from './modalButton';
import { CloseButton } from './closeButton';
import Avatar from '../../../components/avatar/index';
import { ButtonPanel } from './buttonPanel';

//  constants
import Colors from '../../../constants/colors';

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

export const ModalComponent: React.FC<ModalComponentProps> = memo(
  ({
    modalVisible,
    setModalVisible,
    rate,
    setRate,
    userData,
    handleEvaluation,
  }) => {
    const { avatarUri, instaName } = userData;

    return (
      <Modal animationType="slide" transparent visible={modalVisible}>
        <CenteredView>
          <View style={styles.modalView}>
            <ModalUserInfoContainer>
              <Avatar avatar={avatarUri} />
              <ModalText>@{instaName}</ModalText>
            </ModalUserInfoContainer>
            <ButtonPanel rate={rate} setRate={setRate} />
            <ModalButton onPress={() => handleEvaluation(rate)} />
          </View>
          <CloseButton onPress={() => setModalVisible(false)} />
        </CenteredView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
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
