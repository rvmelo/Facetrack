import styled from 'styled-components/native';

import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
`;

export const ProfileDataContainer = styled.View`
  padding: 20px;
`;

export const StyledName = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-weight: bold;
  color: ${Colors.accent};
  margin-top: 10px;
`;

export const StyledText = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

export const TouchableInterface = styled.TouchableWithoutFeedback``;
