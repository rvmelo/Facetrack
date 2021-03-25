/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react';

import { StyledButton, ButtonLayout, ButtonText } from './styles';

interface ButtonProps {
  buttonText: string;
  disabled?: boolean;
  disabledLayout?: boolean;
  onPress(value: any): void;
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
  disabled = false,
  disabledLayout = false,
  onPress,
}) => {
  return (
    <StyledButton disabled={disabled} onPress={onPress}>
      <ButtonLayout disabled={disabledLayout}>
        <ButtonText>{buttonText}</ButtonText>
      </ButtonLayout>
    </StyledButton>
  );
};

export default memo(Button);
