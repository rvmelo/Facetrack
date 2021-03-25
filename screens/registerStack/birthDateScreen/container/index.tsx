import React, { memo } from 'react';

// constants
import Colors from '../../../../constants/colors';

// components
import Button from '../../components/button';

// styles
import { BirthDateInput, StyledText } from './styles';
import { Container } from '../../styles';

// hooks
import useBirthDateScreen from '../useBirthDateScreen';

const BirthDateScreen: React.FC = () => {
  const { birthDate, setBirthDate, handleContinue } = useBirthDateScreen();

  return (
    <Container>
      <StyledText>BirthDate</StyledText>
      <BirthDateInput
        type="datetime"
        options={{
          format: 'DD/MM/YYYY',
        }}
        value={birthDate}
        onChangeText={date => setBirthDate(date)}
        placeholder="DD/MM/YYYY"
        placeholderTextColor={Colors.text}
      />
      <Button
        disabled={!birthDate}
        disabledLayout={!birthDate}
        buttonText="Continue"
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(BirthDateScreen);
