import React from 'react';
import PickerSection from './pickerSection';

import {
  StyledScroll,
  ButtonContainer,
  StyledText,
  GenderContainer,
  ImageContainer,
} from './styles';

import Button from './button';

const UserForm: React.FC = () => {
  return (
    <StyledScroll>
      <ImageContainer>
        <StyledText fontSize={15}>Select Profile Picture</StyledText>
      </ImageContainer>
      <GenderContainer>
        <StyledText>Select Your Sex</StyledText>
        <ButtonContainer>
          <Button buttonText="male" />
          <Button buttonText="female" />
        </ButtonContainer>
      </GenderContainer>
      <PickerSection />
      <Button buttonText="Continue" />
    </StyledScroll>
  );
};

export default UserForm;
