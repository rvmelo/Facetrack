import React, { memo } from 'react';

// navigation
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import {
  ButtonContainer,
  StyledText,
  Container,
  IconContainer,
} from '../../styles';

//  constants
import Colors from '../../../../constants/colors';

//   components
import Button from '../../components/button';

//   hooks
import useSexualOrientationScreen from '../useSexualOrientationScreen';

const SexualOrientationScreen: React.FC = () => {
  const {
    handleContinue,
    handleUserSexualOrientation,
    userSexualOrientation,
  } = useSexualOrientationScreen();

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
      <StyledText>Sexual Orientation</StyledText>
      <ButtonContainer>
        <Button
          buttonText="heterosexual"
          disabledLayout={userSexualOrientation.option !== 'heterosexual'}
          onPress={() =>
            handleUserSexualOrientation({ option: 'heterosexual' })
          }
        />
        <Button
          buttonText="homosexual"
          disabledLayout={userSexualOrientation.option !== 'homosexual'}
          onPress={() => handleUserSexualOrientation({ option: 'homosexual' })}
        />
        <Button
          buttonText="bisexual"
          disabledLayout={userSexualOrientation.option !== 'bisexual'}
          onPress={() => handleUserSexualOrientation({ option: 'bisexual' })}
        />
        <Button
          buttonText="asexual"
          disabledLayout={userSexualOrientation.option !== 'asexual'}
          onPress={() => handleUserSexualOrientation({ option: 'asexual' })}
        />
      </ButtonContainer>
      <Button
        buttonText="Continue"
        disabled={!userSexualOrientation.option}
        disabledLayout={!userSexualOrientation.option}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(SexualOrientationScreen);
