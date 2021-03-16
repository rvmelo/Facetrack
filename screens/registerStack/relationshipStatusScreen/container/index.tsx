import React from 'react';

import { ButtonContainer, StyledText, Container } from '../../styles';

import Button from '../../components/button';

import useRelationshipStatusScreen from '../useRelationshipStatusScreen';

const RelationshipStatusScreen: React.FC = () => {
  const {
    handleContinue,
    handleUserRelationshipStatus,
    userRelationshipStatus,
  } = useRelationshipStatusScreen();

  return (
    <Container>
      <StyledText>Relationship Status</StyledText>
      <ButtonContainer>
        <Button
          buttonText="single"
          disabled={userRelationshipStatus.option !== 'single'}
          onPress={() => handleUserRelationshipStatus({ option: 'single' })}
        />
        <Button
          buttonText="serious relationship"
          disabled={userRelationshipStatus.option !== 'serious relationship'}
          onPress={() =>
            handleUserRelationshipStatus({ option: 'serious relationship' })
          }
        />
        <Button
          buttonText="married"
          disabled={userRelationshipStatus.option !== 'married'}
          onPress={() => handleUserRelationshipStatus({ option: 'married' })}
        />
      </ButtonContainer>
      <Button
        buttonText="Continue"
        disabled={!userRelationshipStatus.option}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default RelationshipStatusScreen;
