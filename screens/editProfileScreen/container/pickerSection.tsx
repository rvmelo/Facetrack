/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

//  i18n
import { translate } from '../../../i18n/src/locales';

//  styles
import { PickerContainer, SectionText } from './styles';

//  constants
import Colors from '../../../constants/colors';

import { UserInfoType } from '../useEditProfile';

interface PickerSectionProps {
  userInfo: UserInfoType;
  setUserInfo(userInfo: UserInfoType): void;
  setShouldUpdate(shouldUpdate: boolean): void;
}

const PickerSection: React.FC<PickerSectionProps> = ({
  userInfo,
  setUserInfo,
  setShouldUpdate,
}) => {
  return (
    <>
      <SectionText>{`${translate('sexualOrientation2')}:`}</SectionText>

      <PickerContainer>
        <Ionicons name="md-male-female-outline" size={25} color="white" />

        <Picker
          selectedValue={userInfo?.sexualOrientation}
          style={{
            width: 200,
            color: Colors.accent,
          }}
          dropdownIconColor={Colors.accent}
          onValueChange={(itemValue, _) => {
            if (
              itemValue !== 'heterosexual' &&
              itemValue !== 'homosexual' &&
              itemValue !== 'bisexual' &&
              itemValue !== 'asexual'
            )
              return;

            setUserInfo({
              relationshipStatus: userInfo.relationshipStatus,
              sexualOrientation: itemValue,
            });
            setShouldUpdate(true);
          }}
        >
          <Picker.Item label={translate('heterosexual')} value="heterosexual" />
          <Picker.Item label={translate('homosexual')} value="homosexual" />
          <Picker.Item label={translate('bisexual')} value="bisexual" />
          <Picker.Item label={translate('asexual')} value="asexual" />
        </Picker>
      </PickerContainer>

      <SectionText>{`${translate('relationshipStatus2')}:`}</SectionText>

      <PickerContainer>
        <Ionicons name="md-heart-outline" size={25} color="white" />

        <Picker
          selectedValue={userInfo?.relationshipStatus}
          style={{
            width: 200,
            color: Colors.accent,
          }}
          dropdownIconColor={Colors.accent}
          onValueChange={(itemValue, _) => {
            if (
              itemValue !== 'single' &&
              itemValue !== 'serious relationship' &&
              itemValue !== 'married'
            )
              return;

            setUserInfo({
              relationshipStatus: itemValue,
              sexualOrientation: userInfo.sexualOrientation,
            });

            setShouldUpdate(true);
          }}
        >
          <Picker.Item label={translate('single')} value="single" />
          <Picker.Item
            label={translate('seriousRelationship')}
            value="serious relationship"
          />
          <Picker.Item label={translate('married')} value="married" />
        </Picker>
      </PickerContainer>
    </>
  );
};

export default memo(PickerSection);
