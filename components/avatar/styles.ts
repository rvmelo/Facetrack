import styled from 'styled-components/native';

//  constants
import Colors from '../../constants/colors';

interface UserAvatarContainerProps {
  avatar: string;
}

export const UserAvatarContainer = styled.View<UserAvatarContainerProps>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: ${props => (props.avatar ? 0 : 1)}px;
  border-color: ${Colors.accent};
`;

export const UserAvatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 30px;
`;
