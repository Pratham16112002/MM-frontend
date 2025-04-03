import { SearchMovie } from '@/api/private/movies';
import { MovieSearchType } from '@/app/(private)/search';
import Images from '@/constants/Images';
import { useQuery } from '@tanstack/react-query';
import {
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MovieCard from './SearchItem';
import { forwardRef, useImperativeHandle } from 'react';
import React from 'react';

type Props = {
  searchTerm: string;
  onListScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const MovieSearchList = forwardRef(
  ({ onListScroll, searchTerm }: Props, ref) => {
    const flatListRef = React.useRef<Animated.FlatList<MovieSearchType>>(null);
    useImperativeHandle(ref, () => {
     return {
       scrollUp : () => {
         flatListRef.current?.scrollToOffset({
           offset: 0,
           animated: true,
         });
       },
     }; 
    },[]);
    const { data, isLoading, isError } = useQuery({
      queryKey: ['search', searchTerm],
      queryFn: () => {
        // eslint-disable-next-line react/prop-types
        return SearchMovie(searchTerm.toLowerCase());
      },
      enabled: !!searchTerm,
    });
    if (!searchTerm) {
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            Search for movies by title...
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
            source={Images.error}
            style={styles.errorImage}
            resizeMode="contain"
          />
          <Text style={styles.errorText}>Failed to fetch movies</Text>
        </View>
      );
    }
    return (
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onListScroll}
        data={data?.data.data as MovieSearchType[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard key={item.id} item={item} />}
        contentContainerStyle={[
          { paddingTop: verticalScale(140) },
          styles.listContent,
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

MovieSearchList.displayName = 'MovieSearchList';

export default MovieSearchList;

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
    fontSize: moderateScale(16),
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
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
});
