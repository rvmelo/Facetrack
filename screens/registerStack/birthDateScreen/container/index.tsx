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

// i18n
import { translate, location } from '../../../../i18n/src/locales';

const BirthDateScreen: React.FC = () => {
  const { birthDate, setBirthDate, handleContinue } = useBirthDateScreen();

  return (
    <Container>
      <StyledText>{translate('birthDate')}</StyledText>
      <BirthDateInput
        type="datetime"
        options={{
          format: location === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY',
        }}
        value={birthDate}
        onChangeText={date => setBirthDate(date)}
        placeholder={location === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}
        placeholderTextColor={Colors.text}
      />
      <Button
        disabled={!birthDate}
        disabledLayout={!birthDate}
        buttonText={translate('continueButton')}
        onPress={handleContinue}
      />
    </Container>
  );
};

export default memo(BirthDateScreen);
