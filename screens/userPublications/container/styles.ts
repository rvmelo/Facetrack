import styled from 'styled-components/native';

//  constants
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

interface UserPhotoProps {
  height: number;
}

export const Container = styled.View`
  background-color: ${Colors.background};
  padding-bottom: 20px;
`;

export const PublicationContainer = styled.View`
  background-color: ${Colors.background};
  margin-top: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin: 0 10px 10px;
`;

export const Instagram = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

export const Description = styled.Text`
  margin: 10px;
  text-align: center;
  color: ${Colors.accent};
  font-family: ${fonts.family};
  font-size: ${fonts.sizes.md}px;
`;

export const PhotoContainer = styled.View`
  height: 300px;
  width: 100%;
`;

export const UserPhoto = styled.Image<UserPhotoProps>`
  width: 100%;
  height: ${props => props.height}px;
`;
