import { GetFriends } from '@/api/private/peers';
import { FriendSearchType } from '@/app/(private)/peer';
import Images from '@/constants/Images';
import { useQuery } from '@tanstack/react-query';
import React, { forwardRef, useImperativeHandle } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';
import SearchFriendCard from '../Card/SearchFriendCard';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { FreindRequestType } from '@/app/(private)/(tabs)/friends/(section)/requests';

type Props = {
  searchTerm: string;
  onListScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const FriendSearchList = forwardRef(
  ({ searchTerm, onListScroll }: Props, ref) => {
    const flatListRef =
      React.useRef<Animated.FlatList<FreindRequestType>>(null);
    useImperativeHandle(ref, () => {
      return {
        scrollUp: () => {
          flatListRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
        },
      };
    }, []);
    const { data, isLoading, isError } = useQuery({
      queryKey: ['search', searchTerm],
      queryFn: () => {
        return GetFriends(searchTerm.toLowerCase());
      },
      enabled: !!searchTerm,
    });
    if (!searchTerm) {
      return (
        <View style={styles.placeholderContainer}>
          <Text numberOfLines={1} style={styles.placeholderText}>
            Search for friends by username...
          </Text>
        </View>
      );
    }
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    if (isError) {
      return (
        <View style={styles.errorContainer}>
          <Image
            style={styles.errorImage}
            source={Images.error}
            resizeMode="contain"
          />
          <Text numberOfLines={1} style={styles.errorText}>
            Something went wrong
          </Text>
        </View>
      );
    }
    return (
      <Animated.FlatList
        onScroll={onListScroll}
        data={data?.data.data as FriendSearchType[]}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <SearchFriendCard
            fullName={item.fullName}
            profilePic={item.profilePic}
            username={item.username}
          />
        )}
        contentContainerStyle={[
          {
            paddingTop: verticalScale(100),
            gap: verticalScale(1),
          },
        ]}
        ListEmptyComponent={() => (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>No result found</Text>
          </View>
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={11}
      />
    );
  },
);

FriendSearchList.displayName = 'FriendSearchList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: scale(10),
    gap: verticalScale(6),
  },
  cardContainer: {
    backgroundColor: '#221155',
    borderRadius: moderateScale(13),
    padding: scale(10),
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
  },
  cardImage: {
    width: scale(100),
    height: verticalScale(70),
    borderRadius: scale(8),
  },
  cardContent: {
    flex: 1,
    marginLeft: scale(10),
  },
  cardTitle: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: moderateScale(18),
  },
  cardDetails: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
    gap: scale(10),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: moderateScale(14),
    marginLeft: scale(4),
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(120),
  },
  placeholderText: {
    color: 'white',
    fontSize: moderateScale(18),
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(120),
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: verticalScale(120),
  },
  errorImage: {
    height: verticalScale(200),
    width: scale(200),
  },
  errorText: {
    color: 'white',
    opacity: 0.7,
    fontSize: moderateScale(18),
    marginTop: verticalScale(15),
  },
});

export default FriendSearchList;
