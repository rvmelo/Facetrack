import React, { memo } from 'react';

// hooks
import useGenderScreen from '../useGenderScreen';

import { ButtonContainer, StyledText, Container } from '../../styles';

import Button from '../../components/button';

const GenderScreen: React.FC = () => {
  const { userSex, handleUserSex, handleContinue } = useGenderScreen();

  return (
    <Container>
      <StyledText>Select Your Sex</StyledText>
      <ButtonContainer>
        <Button
          buttonText="male"
          disabled={userSex !== 'male'}
          onPress={() => handleUserSex('male')}
        />
        <Button
          buttonText="female"
          disabled={userSex !== 'female'}
          onPress={() => handleUserSex('female')}
        />
      </ButtonContainer>
      <Button
        buttonText="Continue"
        disabled={!userSex}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(GenderScreen);
