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

//  components
import Button from '../../components/button';

//  hooks
import useRelationshipStatusScreen from '../useRelationshipStatusScreen';

const RelationshipStatusScreen: React.FC = () => {
  const {
    handleContinue,
    handleUserRelationshipStatus,
    userRelationshipStatus,
  } = useRelationshipStatusScreen();

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
      <StyledText>Relationship Status</StyledText>
      <ButtonContainer>
        <Button
          buttonText="single"
          disabledLayout={userRelationshipStatus.option !== 'single'}
          onPress={() => handleUserRelationshipStatus({ option: 'single' })}
        />
        <Button
          buttonText="serious relationship"
          disabledLayout={
            userRelationshipStatus.option !== 'serious relationship'
          }
          onPress={() =>
            handleUserRelationshipStatus({ option: 'serious relationship' })
          }
        />
        <Button
          buttonText="married"
          disabledLayout={userRelationshipStatus.option !== 'married'}
          onPress={() => handleUserRelationshipStatus({ option: 'married' })}
        />
      </ButtonContainer>
      <Button
        buttonText="Continue"
        disabled={!userRelationshipStatus.option}
        disabledLayout={!userRelationshipStatus.option}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(RelationshipStatusScreen);
