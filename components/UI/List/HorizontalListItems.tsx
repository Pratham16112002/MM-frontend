import { GenreListDataType } from '@/app/(private)/list';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import GenreListItem from './GenreListItem';
import { useQuery } from '@tanstack/react-query';
import { fetchDataByGenre } from '@/api/private/movies';
import { verticalScale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

// import { Container } from './styles';

type Props = {
  genres: string;
  language: {
    code: string;
    language: string;
  };
  type: string;
};

const ListHorizontalItems: React.FC<Props> = ({ genres, type, language }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['fetchDataByGenre', { type, language, genres }],
    queryFn: async () => {
      const response = await fetchDataByGenre({
        genres: genres,
        lang: language.code,
        type: type,
      });
      return response;
    },
  });
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={'#fff'} />
        </View>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }
  if (data?.data.data.length !== 0) {
    return (
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginVertical: 10,
            color: 'white',
          }}>
          {language.language} {type}
        </Text>
        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          data={data?.data.data as GenreListDataType[]}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return <GenreListItem data={item} />;
          }}
        />
      </View>
    );
  }

  return <></>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    height: verticalScale(110),
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListHorizontalItems;
