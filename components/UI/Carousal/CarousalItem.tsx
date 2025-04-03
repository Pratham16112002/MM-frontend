import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  // Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Images from '@/constants/Images';

type Props = {
  index: number;
  title: string;
  scrollOffset: SharedValue<number>;
  img: string;
  genres: string[];
  startYear: number;
};

export const CarousalCardWidth = scale(190);
export const CarousalCardHeight = verticalScale(250);

export const maxCarousalCardZIndex = 10;

const CarousalItem: React.FC<Props> = ({
  index,
  // startYear,
  // title,
  scrollOffset,
  // genres,
  img,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<{ uri: string } | number>({
    uri: img,
  });

  const animatedStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value;
    const inputRange = [
      (index - 1) * CarousalCardWidth,
      index * CarousalCardWidth,
      (index + 1) * CarousalCardWidth,
    ];
    const translateX = interpolate(
      activeIndex,
      inputRange,
      [-CarousalCardWidth * 0.5, 0, CarousalCardWidth * 0.5],
      Extrapolation.EXTEND,
    );
    const zIndex = Math.round(
      interpolate(
        activeIndex,
        inputRange,
        [9, maxCarousalCardZIndex, 9],
        Extrapolation.EXTEND,
      ),
    );
    const opacity = interpolate(
      activeIndex,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.EXTEND,
    );
    const scale = interpolate(
      activeIndex,
      inputRange,
      [0.7, 1, 0.7],
      Extrapolation.EXTEND,
    );

    return {
      transform: [{ translateX }, { scale }],
      opacity,
      zIndex,
    };
  }, []);

  const animatedCardWrapperStyle = useAnimatedStyle(() => {
 const activeIndex = scrollOffset.value;
    const inputRange = [
      (index - 1) * CarousalCardWidth,
      index * CarousalCardWidth,
      (index + 1) * CarousalCardWidth,
    ];

  const opacity = 
      interpolate(
        activeIndex,
        inputRange,
        [0, 1.0, 0],
        Extrapolation.EXTEND,
      )
    
    return {
      opacity : opacity
    }
  })

  return (
    <Animated.View
      key={index}
      style={[animatedStyle, styles.CarousalItemWrapper]}>
      <ImageBackground
        source={imageSrc}
        style={{ flex: 1 }}
        resizeMethod="auto"
        resizeMode="cover"
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setImageSrc(Images.error); // Set fallback image on error
        }}>
        {/* Gradient Overlay */}
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.0)',
            'rgba(0, 0, 0, 0.2)',
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 0, 0, 0.8)',
          ]}
          style={StyleSheet.absoluteFillObject}>
          {/* Show loader while loading */}
          {loading ? (
            <View
              style={{
                backgroundColor: 'rgba(53, 69, 98, 1)',
                justifyContent: 'center',
                alignItems: 'center',
                flex : 1,
              }}>
              <ActivityIndicator size={'small'} color={'white'} />
            </View>
          ) : (
            <Animated.View
              style={[animatedCardWrapperStyle, styles.CardWrapper]}>
              {/* <View style={styles.ContentWrapper}>
                <View style={styles.ContentTitleWrapper}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.CardTitleText}>
                    {title}
                  </Text>
                </View>
                <View style={styles.InfoWrapper}>
                  <Text style={styles.CardStatsText}>{startYear}</Text>
                  <View style={styles.GenresWrapper}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.CardStatsText}>
                      {genres.join('/')}
                    </Text>
                  </View>
                </View>
                <View style={styles.StatsWrapper}>
                  <View style={styles.CardStatsWrapper}>
                    <AntDesign
                      name="star"
                      size={moderateScale(20)}
                      color="white"
                    />
                    <Text style={styles.CardStatsText}>{7.3}</Text>
                  </View>
                  <View style={styles.CardStatsWrapper}>
                    <MaterialIcons
                      name="reviews"
                      size={moderateScale(20)}
                      color="white"
                    />
                    <Text style={styles.CardStatsText}>{1601}</Text>
                  </View>
                </View>
              </View> */}
            </Animated.View>
          )}
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  GenresWrapper: {
    overflow: 'hidden',
    flexShrink: 1,
  },
  CarousalItemWrapper: {
    width: CarousalCardWidth,
    height: CarousalCardHeight,
    borderRadius: moderateScale(6, 2),
    overflow: 'hidden',
  },
  CardWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(8),
  },
  CardTitleText: {
    fontSize: moderateScale(20),
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'auto',
    textAlignVertical: 'bottom',
    color: '#827d85',
    maxWidth: '100%',
    flexShrink: 1,
  },
  CardStatsText: {
    color: 'white',
    textAlignVertical: 'bottom',
  },
  StatsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardStatsWrapper: {
    flexDirection: 'row',
    gap: scale(2),
    alignItems: 'center',
  },
  InfoWrapper: {
    flexDirection: 'row',
    gap: scale(6),
    justifyContent: 'center',
  },
  ContentWrapper: {
    flexDirection: 'column',
    gap: verticalScale(5),
  },
  ContentTitleWrapper: {
    height: verticalScale(30),
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#25134b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CarousalItem;
