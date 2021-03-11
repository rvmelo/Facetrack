import React, { memo } from 'react';

import { StyledButton, ButtonLayout, ButtonText } from './styles';

interface ButtonProps {
  buttonText: string;
}

const Button: React.FC<ButtonProps> = ({ buttonText }) => {
  return (
    <StyledButton onPress={() => console.log('select sex')}>
      <ButtonLayout>
        <ButtonText>{buttonText}</ButtonText>
      </ButtonLayout>
    </StyledButton>
  );
};

export default memo(Button);
