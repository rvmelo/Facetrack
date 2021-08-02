import styled from 'styled-components/native';

//  constants
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

interface UserPhotoProps {
  height: number;
}

export const PublicationContainer = styled.ScrollView`
  background-color: ${Colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  padding-left: 10px;
`;

export const HeaderTextContainer = styled.View`
  flex-direction: column;
  margin-left: 10px;
`;

export const StyledName = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-weight: bold;
  color: ${Colors.accent};
`;

export const Instagram = styled.Text`
  font-size: ${fonts.sizes.md}px;
  font-family: ${fonts.family};
  color: ${Colors.accent};
`;

export const StyledDate = styled.Text`
  margin-top: 10px;
  text-align: center;
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

export const UserPhoto = styled.Image<UserPhotoProps>`
  width: 100%;
  height: ${props => props.height}px;
`;
