import { router } from 'expo-router';
import React from 'react';
import {
  Text,
  ImageBackground,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type Props = {
  id: number;
  title: string;
  poster: string;
  type: 'movie' | 'tvSeries';
};

const GenreCard: React.FC<Props> = ({ title, poster, type }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/(private)/list',
          params: {
            type: type,
            genres: title.split('/', 2).join(','),
          },
        });
      }}
      style={styles.CardContainer}>
      <ImageBackground
        source={{ uri: poster }}
        style={styles.ImageBackground}
        imageStyle={styles.ImageBorder}
        resizeMode="cover">
        <View style={styles.overlay}>
          <View
            style={{
              height: '100%',
              width: 'auto',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                paddingBottom: verticalScale(8),
                fontFamily: 'Poppins_600SemiBold',
                color: 'white',
                fontSize: moderateScale(15),
              }}>
              {title}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    width: scale(200),
    height: verticalScale(100),
    borderRadius: moderateScale(9),
    marginRight: scale(20),
    backgroundColor: 'white',
    overflow: 'hidden', // Ensures content stays within rounded corners
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  ImageBackground: {
    flex: 1,
  },
  ImageBorder: {
    borderRadius: moderateScale(9),
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  TitleDescriptionWrapper: {
    flexDirection: 'column',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: scale(8),
    paddingBottom: verticalScale(8),
  },
  TitleText: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: moderateScale(15),
    marginBottom: verticalScale(4),
  },
  DescriptionText: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
    textAlign: 'left',
  },
  DescriptionWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
});

export default GenreCard;
