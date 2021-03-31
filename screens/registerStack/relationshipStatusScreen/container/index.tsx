import React, { memo } from 'react';

// navigation
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import {
  ButtonContainer,
  StyledText,
  Container,
  IconContainer,
  TopContainer,
} from '../../styles';

//  constants
import Colors from '../../../../constants/colors';

//  components
import Button from '../../components/button';

//  hooks
import useRelationshipStatusScreen from '../useRelationshipStatusScreen';

// i18n
import { translate } from '../../../../i18n/src/locales';

const RelationshipStatusScreen: React.FC = () => {
  const {
    handleContinue,
    handleUserRelationshipStatus,
    userRelationshipStatus,
  } = useRelationshipStatusScreen();

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
        <StyledText>{translate('relationshipStatus')}:</StyledText>
      </TopContainer>

      <ButtonContainer>
        <Button
          buttonText={translate('single')}
          disabledLayout={userRelationshipStatus.option !== 'single'}
          onPress={() => handleUserRelationshipStatus({ option: 'single' })}
        />
        <Button
          buttonText={translate('seriousRelationship')}
          disabledLayout={
            userRelationshipStatus.option !== 'serious relationship'
          }
          onPress={() =>
            handleUserRelationshipStatus({ option: 'serious relationship' })
          }
        />
        <Button
          buttonText={translate('married')}
          disabledLayout={userRelationshipStatus.option !== 'married'}
          onPress={() => handleUserRelationshipStatus({ option: 'married' })}
        />
      </ButtonContainer>
      <Button
        buttonText={translate('continueButton')}
        disabled={!userRelationshipStatus.option}
        disabledLayout={!userRelationshipStatus.option}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(RelationshipStatusScreen);
