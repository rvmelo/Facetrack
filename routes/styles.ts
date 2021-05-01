import styled from 'styled-components/native';
import Colors from '../constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  justify-content: center;
  align-items: center;
`;

export const StyledSpinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: Colors.primary,
})``;
