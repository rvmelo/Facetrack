/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { Picker } from '@react-native-community/picker';

import { StyledText, PickerContainer } from './styles';

interface PickerProps {
  handleSexualOrientation: (itemValue: number | string) => void;
  handleRelationshipStatus: (itemValue: number | string) => void;
  relationshipStatus: number | string;
  sexualOrientation: number | string;
}

const PickerSection: React.FC<PickerProps> = ({
  sexualOrientation,
  relationshipStatus,
  handleSexualOrientation,
  handleRelationshipStatus,
}) => {
  return (
    <PickerContainer>
      <StyledText>Sexual Orientation</StyledText>
      <Picker
        selectedValue={sexualOrientation}
        style={{
          height: 30,
          width: 200,
        }}
        onValueChange={handleSexualOrientation}
      >
        <Picker.Item label="heterosexual" value="heterosexual" />
        <Picker.Item label="homosexual" value="homosexual" />
        <Picker.Item label="bisexual" value="bisexual" />
        <Picker.Item label="asexual" value="asexual" />
      </Picker>

      <StyledText>Relationship status</StyledText>
      <Picker
        selectedValue={relationshipStatus}
        style={{
          height: 30,
          width: 200,
        }}
        onValueChange={handleRelationshipStatus}
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
