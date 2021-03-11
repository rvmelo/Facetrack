import React, { memo } from 'react';
import { Picker } from '@react-native-community/picker';

import { StyledText, PickerContainer } from './styles';

const PickerSection: React.FC = () => {
  return (
    <PickerContainer>
      <StyledText>Sexual Orientation</StyledText>
      <Picker
        selectedValue="heterossexual"
        style={{
          height: 30,
          width: 200,
        }}
      >
        <Picker.Item label="heterosexual" value="heterosexual" />
        <Picker.Item label="homosexual" value="homosexual" />
        <Picker.Item label="bisexual" value="bisexual" />
        <Picker.Item label="asexual" value="asexual" />
      </Picker>

      <StyledText>Relationship status</StyledText>
      <Picker
        selectedValue="single"
        style={{
          height: 30,
          width: 200,
        }}
      >
        <Picker.Item label="single" value="single" />
        <Picker.Item
          label="serious relationship"
          value="serious relationship"
        />
        <Picker.Item label="married" value="married" />
      </Picker>
    </PickerContainer>
  );
};

export default memo(PickerSection);
