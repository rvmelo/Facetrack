import React, { memo } from 'react';

import { ButtonContainer, StyledText, Container } from '../../styles';

import Button from '../../components/button';

import useSexualOrientationScreen from '../useSexualOrientationScreen';

const SexualOrientationScreen: React.FC = () => {
  const {
    handleContinue,
    handleUserSexualOrientation,
    userSexualOrientation,
  } = useSexualOrientationScreen();

  return (
    <Container>
      <StyledText>Sexual Orientation</StyledText>
      <ButtonContainer>
        <Button
          buttonText="heterosexual"
          disabled={userSexualOrientation.option !== 'heterosexual'}
          onPress={() =>
            handleUserSexualOrientation({ option: 'heterosexual' })
          }
        />
        <Button
          buttonText="homosexual"
          disabled={userSexualOrientation.option !== 'homosexual'}
          onPress={() => handleUserSexualOrientation({ option: 'homosexual' })}
        />
        <Button
          buttonText="bisexual"
          disabled={userSexualOrientation.option !== 'bisexual'}
          onPress={() => handleUserSexualOrientation({ option: 'bisexual' })}
        />
        <Button
          buttonText="asexual"
          disabled={userSexualOrientation.option !== 'asexual'}
          onPress={() => handleUserSexualOrientation({ option: 'asexual' })}
        />
      </ButtonContainer>
      <Button
        buttonText="Continue"
        disabled={!userSexualOrientation.option}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(SexualOrientationScreen);
