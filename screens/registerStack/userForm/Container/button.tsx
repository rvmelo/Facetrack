/* eslint-disable no-unused-vars */
import React, { memo } from 'react';

import { StyledButton, ButtonLayout, ButtonText } from './styles';

interface ButtonProps {
  buttonText: string;
  disabled?: boolean;
  onPress(value: any): void;
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
  disabled = false,
  onPress,
}) => {
  return (
    <StyledButton onPress={onPress}>
      <ButtonLayout disabled={disabled}>
        <ButtonText>{buttonText}</ButtonText>
      </ButtonLayout>
    </StyledButton>
  );
};

export default memo(Button);
