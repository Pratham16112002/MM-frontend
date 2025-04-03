import React from 'react';
import PersonalizedPickListItem from './PersonalizedPickListItem';
import { FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';
import AddRecommButton from './AddRecomm/AddRecommButton';
import { useQuery } from '@tanstack/react-query';
import { GetPersonalizedPickItems } from '@/api/private/recomm';
import LoadingState from '../Friends/State/LoadingState';
import ErrorState from '../Friends/State/ErrorState';
import { PersonalizedPickListType } from '@/types/types';

 

export default function PersonalizedPickList() {
  const {
    data: personalizedPicks,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['personalized'],
    queryFn: GetPersonalizedPickItems,
  });

  const FlatListRef = React.useRef<FlatList>(null);
  if (isPending) {
    return <LoadingState />;
  }
  if (isError) {
    return <ErrorState />;
  }
  const display_data =
    (personalizedPicks?.data?.data.personalizedList as PersonalizedPickListType[]) || [];
  return (
    <FlatList
      ref={FlatListRef}
      data={display_data as PersonalizedPickListType[]}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      keyExtractor={(item: any) => item.username}
      horizontal
      getItemLayout={(item, index) => ({
        length: scale(75),
        offset: scale(75) * index,
        index: index,
      })}
      renderItem={({ item, index }) => (
        <PersonalizedPickListItem key={index} item={item} />
      )}
      ListFooterComponent={AddRecommButton}
    />
  );
}
