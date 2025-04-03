import React from 'react';
import { FlatList } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import GenreCard from './GenreCard';

// import { Container } from './styles';
export const genres = [
  {
    id: 1,
    title: 'Drama/Thriller',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 2,
    title: 'Comedy/Action',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 3,
    title: 'Documentary/Biography',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 4,
    title: 'Action/Adventure',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 5,
    title: 'Romance/Comedy',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 6,
    title: 'Crime/Mystery',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 7,
    title: 'Horror/Mystery',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 8,
    title: 'Adventure/Fantasy',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 9,
    title: 'Family/Animation',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 10,
    title: 'Sci-Fi/Action',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 11,
    title: 'Sport/Drama',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 12,
    title: 'War/History',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 13,
    title: 'News/Game-Show',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 14,
    title: 'Western/Drama',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 15,
    title: 'Crime/Drama',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 16,
    title: 'Fantasy/Adventure',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
  {
    id: 17,
    title: 'Adult/Thriller',
    poster:
      'https://assets-prd.ignimgs.com/2021/11/02/eternals-blogroll-1634927854174-1635891537209.jpg',
  },
];

interface PopularGenresProps {
  type: 'movie' | 'tvSeries';
}

const PopularGenres: React.FC<PopularGenresProps> = ({ type }) => {
  return (
    <FlatList
      data={genres}
      horizontal
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(8),
      }}
      renderItem={({ item, index }) => {
        return (
          <GenreCard
            key={index}
            id={index}
            poster={item.poster}
            title={item.title}
            type={type}
          />
        );
      }}
    />
  );
};

export default PopularGenres;
