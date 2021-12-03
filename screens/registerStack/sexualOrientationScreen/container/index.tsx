import React, { memo } from 'react';

// navigation
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import {
  ButtonContainer,
  StyledText,
  Container,
  TopContainer,
} from '../../styles';

//  constants
import Colors from '../../../../constants/colors';

//   components
import Button from '../../components/button';

//   hooks
import useSexualOrientationScreen from '../useSexualOrientationScreen';

// i18n
import { translate } from '../../../../i18n/src/locales';

const SexualOrientationScreen: React.FC = () => {
  const { handleContinue, handleUserSexualOrientation, userSexualOrientation } =
    useSexualOrientationScreen();

  const navigation = useNavigation();

  return (
    <Container>
      <TopContainer>
        <Ionicons
          name="chevron-back"
          size={50}
          color={Colors.disabled}
          onPress={() => navigation.goBack()}
        />
        <StyledText>{translate('sexualOrientation')}:</StyledText>
      </TopContainer>

      <ButtonContainer>
        <Button
          buttonText={translate('heterosexual')}
          disabledLayout={userSexualOrientation.option !== 'heterosexual'}
          onPress={() =>
            handleUserSexualOrientation({ option: 'heterosexual' })
          }
        />
        <Button
          buttonText={translate('homosexual')}
          disabledLayout={userSexualOrientation.option !== 'homosexual'}
          onPress={() => handleUserSexualOrientation({ option: 'homosexual' })}
        />
        <Button
          buttonText={translate('bisexual')}
          disabledLayout={userSexualOrientation.option !== 'bisexual'}
          onPress={() => handleUserSexualOrientation({ option: 'bisexual' })}
        />
        <Button
          buttonText={translate('asexual')}
          disabledLayout={userSexualOrientation.option !== 'asexual'}
          onPress={() => handleUserSexualOrientation({ option: 'asexual' })}
        />
      </ButtonContainer>
      <Button
        buttonText={translate('continueButton')}
        disabled={!userSexualOrientation.option}
        disabledLayout={!userSexualOrientation.option}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(SexualOrientationScreen);
