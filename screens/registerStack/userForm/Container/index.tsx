import React, { useEffect } from 'react';

//  navigation
import { useRoute } from '@react-navigation/native';

import PickerSection from './pickerSection';

// hooks
import useForm from '../useForm';

import {
  StyledScroll,
  ButtonContainer,
  StyledText,
  GenderContainer,
  ImageContainer,
} from './styles';

import Button from './button';

interface RouteParams {
  user: {
    id: string;
    displayName: string;
  };
}

const UserForm: React.FC = () => {
  const {
    userData,
    handleSetMaleUser,
    handleSetFemaleUser,
    isMaleButtonDisabled,
    isFemaleButtonDisabled,
    handleRelationshipStatus,
    handleSexualOrientation,
  } = useForm();

  const { params } = useRoute();
  const { user } = params as RouteParams;

  useEffect(() => {
    console.log('user: ', user);
  }, [user]);

  return (
    <StyledScroll>
      <ImageContainer>
        <StyledText fontSize={15}>Select Profile Picture</StyledText>
      </ImageContainer>
      <GenderContainer>
        <StyledText>Select Your Sex</StyledText>
        <ButtonContainer>
          <Button
            buttonText="male"
            disabled={isMaleButtonDisabled}
            onPress={handleSetMaleUser}
          />
          <Button
            buttonText="female"
            disabled={isFemaleButtonDisabled}
            onPress={handleSetFemaleUser}
          />
        </ButtonContainer>
      </GenderContainer>
      <PickerSection
        handleRelationshipStatus={handleRelationshipStatus}
        handleSexualOrientation={handleSexualOrientation}
        relationshipStatus={userData.relationshipStatus}
        sexualOrientation={userData.sexualOrientation}
      />
      <Button
        buttonText="Continue"
        onPress={() => console.log('continue...')}
      />
    </StyledScroll>
  );
};

export default UserForm;
