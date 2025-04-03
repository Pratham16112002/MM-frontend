import { GetFollowing } from '@/api/private/peers';
import ErrorModal from '@/components/UI/ErrorModal';
import FollwingCard from '@/components/UI/Friends/Card/FollowingCard';
import ErrorState from '@/components/UI/Friends/State/ErrorState';
import LoadingState from '@/components/UI/Friends/State/LoadingState';
import HomeScreenWrapper from '@/components/UI/Wrappers/HomeScreenWrapper';
import { getErrorMessage } from '@/constants/Codes';
import useModal from '@/hooks/ui/useModal';
import { APIError } from '@/utils/Exception';
import { FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl, View, Text } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

export default function RequestSection() {
  const { title, visibility, message, Open, Close } = useModal();
  const { data, isRefetching, refetch, isLoading, isError } = useQuery({
    queryKey: ['following'],
    queryFn: GetFollowing,
    staleTime: 0,
  });

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
          data={data?.data.data as any}
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
            <FollwingCard
              onCardError={onError}
              refechCards={refetch}
              friend={{
                username: item.username,
                profilePic: item.profilePic,
                fullName: item.fullName,
              }}
            />
          )}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5
                name="user-friends"
                size={moderateScale(50)}
                color="white"
              />
              <Text
                numberOfLines={1}
                style={{
                  color: 'white',
                  fontSize: moderateScale(16),
                  fontFamily: 'Poppins_600SemiBold',
                  opacity: 0.7,
                }}>
                No Following
              </Text>
            </View>
          }
        />
      </View>
    </HomeScreenWrapper>
  );
}
