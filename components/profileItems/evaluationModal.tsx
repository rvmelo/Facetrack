import React, { memo } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';

import {
  RateModalText,
  ModalUserInfoContainer,
  MessageContainer,
  EvaluationModalText,
  RateModalBackground,
} from './styles';

//  constants
import Colors from '../../constants/colors';

// components
import { CloseButton } from './closeButton';
import Avatar from '../avatar/index';
import { ButtonPanel } from './buttonPanel';
import { ModalEvaluation, ModalUser } from './hooks/useEvaluationModal';

interface ModalComponentProps {
  modalVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setModalVisible: (value: boolean) => void;
  userData: ModalUser;
  evaluation: ModalEvaluation;
}

export const EvaluationModal: React.FC<ModalComponentProps> = memo(
  ({ userData, evaluation, modalVisible, setModalVisible }) => {
    const { avatarUri, instaName } = userData || {};
    const { rate, message } = evaluation || {};

    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <RateModalBackground>
          <View style={styles.modalView}>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
              }}
            >
              <ModalUserInfoContainer>
                <Avatar avatar={avatarUri} />
                <RateModalText>@{instaName}</RateModalText>
              </ModalUserInfoContainer>
              <ButtonPanel rate={rate} setRate={() => undefined} />
              <MessageContainer>
                <EvaluationModalText>{message}</EvaluationModalText>
              </MessageContainer>
            </ScrollView>
          </View>
          <CloseButton
            styles={{ marginTop: 20 }}
            onPress={() => setModalVisible(false)}
          />
        </RateModalBackground>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalView: {
    height: 400,
    marginHorizontal: 20,
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
