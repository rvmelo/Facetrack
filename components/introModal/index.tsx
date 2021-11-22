import React, { memo } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ModalBackground as IntroModalBackground, IntroText } from './styles';

//  constants
import Colors from '../../constants/colors';
import { useIntroModal } from './useIntroModal';
import { ModalButton } from './modaButton';

interface IntroProps {
  text: string;
}

export const IntroModal: React.FC<IntroProps> = memo(({ text }) => {
  const { introModalVisible, setIntroModalVisible } = useIntroModal();

  return (
    <Modal
      animationType="slide"
      transparent
      visible={introModalVisible}
      onRequestClose={() => setIntroModalVisible(false)}
    >
      <IntroModalBackground>
        <View style={styles.modalView}>
          <Ionicons
            name="md-locate"
            style={{ marginBottom: 15 }}
            size={100}
            color={Colors.primary}
          />
          <IntroText>{text}</IntroText>
          <ModalButton onPress={() => setIntroModalVisible(false)} />
        </View>
      </IntroModalBackground>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: Colors.accent,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
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
