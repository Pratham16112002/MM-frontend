import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';
import { Stack } from 'expo-router';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useDebounce } from '@/hooks/ui/useDebounce';
import HomeScreenWrapper from '@/components/UI/Wrappers/HomeScreenWrapper';
import SearchBarCustomHeader from '@/components/UI/Search/SearchBar';
import MovieSearchList from '@/components/UI/Search/SearchList';
import GoUpButton from '@/components/UI/Button/GoUpButton';
export type MovieSearchType = {
  id: string;
  primaryTitle: string;
  primaryImage: string;
  genres: string[];
  numVotes: number;
  averageRating: number;
  startYear: number;
};

const SearchScreen = () => {
  const scrollY = useSharedValue(0);
  const [query, setQuery] = React.useState<string>('');
  const debouncedSearch = useDebounce(query);

  const movieListRef = React.useRef<{ scrollUp: () => void } | null>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <SearchBarCustomHeader
              animatedValue={scrollY}
              onChange={(value: string) => setQuery(value)}
            />
          ),
          headerTransparent: true,
        }}
      />
      <HomeScreenWrapper>
        <SafeAreaView style={styles.safeArea}>
          <MovieSearchList
            ref={movieListRef}
            onListScroll={scrollHandler}
            searchTerm={debouncedSearch}
          />
          <GoUpButton
            sharedValue={scrollY}
            onClick={() => {
              movieListRef.current?.scrollUp();
            }}
          />
        </SafeAreaView>
      </HomeScreenWrapper>
    </View>
  );
};

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

export default SearchScreen;
