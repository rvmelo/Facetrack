import React, { memo } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import {
  ModalBackground as RateModalBackground,
  InputContainer,
  RateModalText,
  ModalUserInfoContainer,
  RateModalInput,
} from './styles';

// components
import { ModalButton } from './modalButton';
import { CloseButton } from '../closeButton';
import Avatar from '../avatar/index';
import { ButtonPanel } from './buttonPanel';

//  constants
import Colors from '../../constants/colors';
import { useRateModal } from './hooks/useRateModal';

//  i18n
import { translate } from '../../i18n/src/locales';

interface EvaluationInput {
  value: number;
  message?: string;
}

interface ModalComponentProps {
  modalVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  setModalVisible: (value: boolean) => void;
  userData: {
    avatarUri: string;
    instaName: string | undefined;
  };
  // eslint-disable-next-line no-unused-vars
  handleEvaluation: (input: EvaluationInput) => void;
}

export const RateModal: React.FC<ModalComponentProps> = memo(
  ({ userData, handleEvaluation, modalVisible, setModalVisible }) => {
    const { avatarUri, instaName } = userData;
    const { display, rate, setRate, message, setMessage } = useRateModal();

    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <RateModalBackground>
          <View style={styles.modalView}>
            <ModalUserInfoContainer>
              <Avatar avatar={avatarUri} />
              <RateModalText>@{instaName}</RateModalText>
            </ModalUserInfoContainer>
            {display && <ButtonPanel rate={rate} setRate={setRate} />}

            <InputContainer>
              <RateModalInput
                placeholder={translate('leaveOptionalMessage')}
                onChangeText={text => setMessage(text)}
              />
            </InputContainer>
            {display && (
              <ModalButton
                onPress={() => handleEvaluation({ value: rate, message })}
              />
            )}
          </View>
          {display && (
            <CloseButton
              styles={{ marginTop: 20 }}
              onPress={() => setModalVisible(false)}
            />
          )}
        </RateModalBackground>
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
