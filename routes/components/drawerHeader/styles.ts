import styled from 'styled-components/native';

import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const Container = styled.View`
  width: 100%;
  background-color: ${Colors.background};
  padding: 10px 0 20px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.text};
`;

export const StyledName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const Instagram = styled.Text`
  font-size: 18px;
  font-family: ${fonts.family};
  color: white;
`;

export const UserAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 20px;
`;
