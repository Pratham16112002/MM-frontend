import { GetIncomingRequests } from '@/api/private/peers';
import ErrorModal from '@/components/UI/ErrorModal';
import FriendRequestCard from '@/components/UI/Friends/Card/RequestCard';
import ErrorState from '@/components/UI/Friends/State/ErrorState';
import LoadingState from '@/components/UI/Friends/State/LoadingState';
import HomeScreenWrapper from '@/components/UI/Wrappers/HomeScreenWrapper';
import { getErrorMessage } from '@/constants/Codes';
import useModal from '@/hooks/ui/useModal';
import { APIError } from '@/utils/Exception';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Text, FlatList, View, RefreshControl } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export interface FreindRequestType {
  username: string;
  profilePic: string;
}

export default function RequestSection() {
  const { title, visibility, message, Open, Close } = useModal();

  const { refetch, isRefetching, data, isError, isLoading } = useQuery({
    queryKey: ['Incoming Requests'],
    queryFn: GetIncomingRequests,
    staleTime: 0,
  });

  const onRemove = () => {
    refetch();
  };
  const onError = (error: APIError) => {
    Open(getErrorMessage(error.code), error.message);
  };

   if (isLoading) return <View style={{flex : 1}} ><LoadingState /></View>;
  if (isError) return <View style={{flex : 1}}><ErrorState /></View>;

  return (
    <HomeScreenWrapper>
      <ErrorModal
        title={title}
        visible={visibility}
        message={message}
        onClose={() => {
          Close();
        }}
      />

      <View style={{ flex: 1, paddingTop: verticalScale(170) }}>
        <FlatList
          data={data?.data.data as FreindRequestType[]}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={['#fff']}
              tintColor={'#fff'}
            />
          }
          keyExtractor={(item) => item.username}
          renderItem={({ item }) => (
            <FriendRequestCard
              friend={item}
              onRemove={onRemove}
              onCardError={onError}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: 'white',
                  fontSize: moderateScale(16),
                  fontFamily: 'Poppins_600SemiBold',
                  opacity: 0.7,
                }}>
                No Incoming Requests...
              </Text>
            </View>
          )}
        />
      </View>
    </HomeScreenWrapper>
  );
}
