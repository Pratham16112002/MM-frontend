/* eslint-disable react/prop-types */
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type Props = {
  scrollOffset: SharedValue<number>;
  index: number;
};

export const CarousalCardWidth = scale(150);
export const CarousalCardHeight = verticalScale(250);
export const maxCarousalCardZIndex = 10;

const LoadingCarousalItem: React.FC<Props> = ({ scrollOffset, index }) => {
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
      [0.8, 1, 0.8],
      Extrapolation.EXTEND,
    );

    return {
      transform: [{ translateX }, { scale }],
      opacity,
      zIndex,
    };
  }, []);

  return (
    <Animated.View key={index} style={[animatedStyle]}>
      <ShimmerPlaceholder
        key={index}
        style={{
          width: CarousalCardWidth,
          height: verticalScale(250), // Adjust height as needed
          borderRadius: 10,
          marginHorizontal: 10,
        }}
        shimmerColors={['#181522', '#25134b', '#181522']}
        shimmerStyle={{ borderRadius: moderateScale(10) }}
        LinearGradient={LinearGradient}
      />
    </Animated.View>
  );
};

export default LoadingCarousalItem;
