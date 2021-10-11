import React from 'react';

import { Ionicons } from '@expo/vector-icons';

//  components
import { useTrackScreen } from '../useTrackScreen';
import { ModalComponent } from './modalComponent';

//  styles
import { TouchableInterface, Container, TrackButtonContainer } from './styles';

//  constants
import Colors from '../../../constants/colors';

export const TrackScreen: React.FC = () => {
  const { users, isVisible, setIsVisible } = useTrackScreen();

  return (
    <>
      <Container>
        <TouchableInterface onPress={() => setIsVisible(true)}>
          <TrackButtonContainer>
            <Ionicons name="md-location" size={30} color={Colors.accent} />
          </TrackButtonContainer>
        </TouchableInterface>
      </Container>
      <ModalComponent
        users={users}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};
