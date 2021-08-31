import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { DATA } from '../../../constants/data';
import { useList, ListData } from '../useList';
import { useListActions } from '../useListActions';
import { ListItem } from './listItem';

interface ItemProps {
  item: {
    uri: string;
  };
}

const RateScreen: React.FC = () => {
  const ref = useRef<FlatList<ListData> | null>(null);

  const { handleListScrollBack, handleUserEvaluation } = useListActions(ref);

  const { listItems } = useList();

  const renderItem = ({ item }: ItemProps) => {
    const cardOpacity = listItems.find(
      card => card.data.uri === item.uri,
    )?.cardOpacity;

    const cardStyle = listItems.find(
      card => card.data.uri === item.uri,
    )?.cardStyle;
    const cardIndex = listItems.findIndex(card => card.data.uri === item.uri);

    const previousCardOpacity =
      cardIndex > 0 ? listItems[cardIndex - 1].cardOpacity : undefined;

    const cardData = { cardOpacity, cardStyle, cardIndex };

    return (
      <ListItem
        uri={item.uri}
        cardData={cardData}
        previousCardOpacity={previousCardOpacity}
        handleUserEvaluation={handleUserEvaluation}
        handleListScrollBack={handleListScrollBack}
      />
    );
  };

  return (
    <FlatList
      ref={ref}
      data={DATA}
      renderItem={renderItem}
      scrollEnabled={false}
      keyExtractor={item => item.id}
    />
  );
};

export default RateScreen;
