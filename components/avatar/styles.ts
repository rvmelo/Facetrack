import styled from 'styled-components/native';

//  constants
import Colors from '../../constants/colors';

interface AvatarProps {
  avatar: string;
}

export const UserAvatarContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 0;
  overflow: hidden;
`;

export const UserAvatar = styled.Image<AvatarProps>`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: ${props =>
    props.avatar ? 'transparent' : Colors.disabled};
`;
