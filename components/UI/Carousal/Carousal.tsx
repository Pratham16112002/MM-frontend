import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useQuery } from '@tanstack/react-query';
import CarousalItem, { CarousalCardWidth } from './CarousalItem';
import { popularMovies } from '@/api/private/movies';
import Images from '@/constants/Images';
import { scale, verticalScale } from 'react-native-size-matters';
import { longStaleTime } from '@/constants/Query';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DUMMY_MOVIES = [
  {
    id: '1',
    primaryTitle: 'Inception',
    genres: ['Sci-Fi', 'Thriller'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
    startYear: 2010,
  },
  {
    id: '2',
    primaryTitle: 'Interstellar',
    genres: ['Sci-Fi', 'Drama'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    startYear: 2014,
  },
  {
    id: '3',
    primaryTitle: 'The Dark Knight',
    genres: ['Action', 'Crime'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    startYear: 2008,
  },
  {
    id: '4',
    primaryTitle: 'Avatar',
    genres: ['Sci-Fi', 'Adventure'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
    startYear: 2009,
  },
  {
    id: '5',
    primaryTitle: 'Titanic',
    genres: ['Romance', 'Drama'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    startYear: 1997,
  },
  {
    id: '6',
    primaryTitle: 'Gladiator',
    genres: ['Action', 'Drama'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
    startYear: 2000,
  },
  {
    id: '7',
    primaryTitle: 'The Shawshank Redemption',
    genres: ['Drama', 'Crime'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    startYear: 1994,
  },
  {
    id: '8',
    primaryTitle: 'The Godfather',
    genres: ['Crime', 'Drama'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    startYear: 1972,
  },
  {
    id: '9',
    primaryTitle: 'Forrest Gump',
    genres: ['Drama', 'Romance'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg',
    startYear: 1994,
  },
  {
    id: '10',
    primaryTitle: 'The Matrix',
    genres: ['Sci-Fi', 'Action'],
    primaryImage: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    startYear: 1999,
  },
];

type PopularTitleData = {
  id: string;
  primaryTitle: string;
  genres: string[];
  primaryImage: string;
  startYear: number;
};

const Carousal: React.FC = () => {
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollOffset.value = contentOffset.x;
    },
  });
  const { isLoading, data, isError } = useQuery({
    queryKey: ['popular-title'],
    queryFn: popularMovies,
    staleTime: longStaleTime,
  });
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={'small'} color={'white'} />
      </View>
    );
  }
  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Image
          source={Images.error}
          style={{ height: verticalScale(100), width: scale(100) }}
          resizeMethod="auto"
          resizeMode="contain"
        />
      </View>
    );
  }

  if(!data?.data || (Array.isArray(data.data.data) && data?.data.data.length === 0)) {
    return null
  }

  // Animated scroll handler

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      contentContainerStyle={{
        paddingHorizontal: scale(108),
        alignItems: 'center',
      }}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CarousalCardWidth}
      decelerationRate={'fast'}
      disableIntervalMomentum
      scrollEventThrottle={16}
      pagingEnabled
      horizontal>
      {data?.data.data.map((item: PopularTitleData, index: number) => (
        <CarousalItem
          key={item.id}
          title={item.primaryTitle}
          startYear={item.startYear}
          genres={item.genres}
          index={index}
          img={item.primaryImage}
          scrollOffset={scrollOffset}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default Carousal;
