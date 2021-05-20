import styled from 'styled-components/native';

import Colors from '../../constants/colors';
import { fonts } from '../../constants/fonts';

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
  margin-top: 10px;
`;

export const Instagram = styled.Text`
  font-size: 18px;
  font-family: ${fonts.family};
  color: white;
`;
