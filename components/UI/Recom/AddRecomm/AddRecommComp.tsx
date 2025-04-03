import React from 'react';
import { Text, View, TextInput, FlatList, Image } from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

// Dummy data for testing
const dummyMovies = [
  {
    id: 1,
    title: 'Inception',
    description: 'A mind-bending thriller',
    image: 'https://example.com/inception.jpg',
  },
  {
    id: 2,
    title: 'Interstellar',
    description: 'A journey beyond the stars',
    image: 'https://example.com/interstellar.jpg',
  },
];

const AddRecommComponent: React.FC = () => {
    const onSearchTextChange = (text : string)  => {
        console.log(text);  
    }
  return (
    <View style={{ flex: 1, padding: moderateScale(10) }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: moderateScale(14),
          paddingHorizontal: scale(10),
          marginVertical: verticalScale(10),
        }}>
        <TextInput
          onChangeText={onSearchTextChange}
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: moderateScale(18),
            paddingVertical: 0,
            height: verticalScale(37),
          }}
          placeholder="Search in Movie Maven"
          placeholderTextColor={'#7f7f84'}
          textAlign="left"
        />
      </View>
      {/* Movie List */}
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <FlatList
          data={dummyMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: moderateScale(14),
                padding: scale(10),
                marginBottom: verticalScale(10),
              }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: scale(50),
                  height: verticalScale(75),
                  borderRadius: moderateScale(8),
                  marginRight: scale(10),
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: 'Poppins_600SemiBold',
                    fontSize: moderateScale(14),
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins_400Regular',
                    fontSize: moderateScale(12),
                    color: 'gray',
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AddRecommComponent;