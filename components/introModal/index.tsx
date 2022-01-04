import React, { memo } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//  styles
import { ModalBackground as IntroModalBackground, IntroText } from './styles';

//  components
import { ModalButton } from './modaButton';

//  hooks
import { useIntroModal } from './useIntroModal';

//  constants
import Colors from '../../constants/colors';

interface IntroProps {
  text: string;
  iconName: 'md-mail' | 'md-person' | 'md-open' | 'md-star-outline';
  introKey:
    | 'isRateUserFirstLaunch'
    | 'isProfileStarFirstLaunch'
    | 'isProfileEvaluationsFirstLaunch'
    | 'isRandomUserFirstLaunch';
}

export const IntroModal: React.FC<IntroProps> = memo(
  ({ text, iconName, introKey }) => {
    const { introModalVisible, setIntroModalVisible } = useIntroModal({
      introKey,
    });

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
              name={iconName}
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
  },
);

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
