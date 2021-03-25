import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';

// navigation
import { useNavigation } from '@react-navigation/native';

// hooks
import useGenderScreen from '../useGenderScreen';

//  constants
import Colors from '../../../../constants/colors';

import {
  ButtonContainer,
  StyledText,
  Container,
  IconContainer,
} from '../../styles';

import Button from '../../components/button';

const GenderScreen: React.FC = () => {
  const { userSex, handleUserSex, handleContinue } = useGenderScreen();

  const navigation = useNavigation();

  return (
    <Container>
      <IconContainer>
        <Ionicons
          name="chevron-back"
          size={50}
          color={Colors.disabled}
          onPress={() => navigation.goBack()}
        />
      </IconContainer>

      <StyledText>Select Select Your Sex</StyledText>
      <ButtonContainer>
        <Button
          buttonText="male"
          disabledLayout={userSex !== 'male'}
          onPress={() => handleUserSex('male')}
        />
        <Button
          buttonText="female"
          disabledLayout={userSex !== 'female'}
          onPress={() => handleUserSex('female')}
        />
      </ButtonContainer>
      <Button
        buttonText="Continue"
        disabled={!userSex}
        disabledLayout={!userSex}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(GenderScreen);
