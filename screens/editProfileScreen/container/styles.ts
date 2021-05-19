import styled from 'styled-components/native';

//  constants
import Colors from '../../../constants/colors';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    paddingTop: 20,
  },
})`
  background-color: ${Colors.background};
`;

export const AvatarContainer = styled.View`
  border-radius: 10px;
  border-color: ${Colors.primary};
  border-width: 2px;
  width: 150px;
  height: 150px;

  overflow: hidden;

  align-items: center;
  justify-content: center;
`;

export const TouchableInterface = styled.TouchableWithoutFeedback``;

export const AvatarImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  height: 100%;
  width: 100%;
`;
