import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';

// navigation
import { useNavigation } from '@react-navigation/native';

// hooks
import useGenderScreen from '../useGenderScreen';

//  constants
import Colors from '../../../../constants/colors';

// i18n
import { translate } from '../../../../i18n/src/locales';

//  styles
import {
  ButtonContainer,
  StyledText,
  Container,
  IconContainer,
  TopContainer,
} from '../../styles';

//  components
import Button from '../../components/button';

const GenderScreen: React.FC = () => {
  const { userSex, handleUserSex, handleContinue } = useGenderScreen();

  const navigation = useNavigation();

  return (
    <Container>
      <TopContainer>
        <IconContainer>
          <Ionicons
            name="chevron-back"
            size={50}
            color={Colors.disabled}
            onPress={() => navigation.goBack()}
          />
        </IconContainer>

        <StyledText>{translate('sexSelection')}:</StyledText>
      </TopContainer>

      <ButtonContainer>
        <Button
          buttonText={translate('male')}
          disabledLayout={userSex !== 'male'}
          onPress={() => handleUserSex('male')}
        />
        <Button
          buttonText={translate('female')}
          disabledLayout={userSex !== 'female'}
          onPress={() => handleUserSex('female')}
        />
      </ButtonContainer>
      <Button
        buttonText={translate('continueButton')}
        disabled={!userSex}
        disabledLayout={!userSex}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(GenderScreen);
