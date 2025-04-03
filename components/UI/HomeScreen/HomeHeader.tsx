import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { router } from 'expo-router';

interface HomeHeaderProps {
  animatedValue: SharedValue<number>;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ animatedValue }) => {
  const { top } = useSafeAreaInsets();
  // TODO change the name of files and finalize this alpha effect
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 5],
      ['rgba(34, 17, 85, 0)', 'rgba(0, 0, 0, 0.7)'], // From opaque to transparent
    );

    return {
      backgroundColor: backgroundColor,
    };
  });
  return (
    <Animated.View style={[styles.Wrapper, { paddingTop: top }, animatedStyle]}>
      <View style={styles.TitleWrapper}>
        <Text style={styles.TilteStyle}>Movie Maven</Text>
      </View>
      <View style={styles.BellSearchWrapper}>
        {/* Icon and Search Icon  */}
        <TouchableOpacity onPress={() => router.push('/(private)/search')}>
          <Feather
            name="search"
            style={{
              opacity: 0.8,
            }}
            size={moderateScale(20)}
            color="white"
          />
        </TouchableOpacity>
        <FontAwesome
          name="bell"
          style={{
            opacity: 0.8,
          }}
          size={moderateScale(20)}
          color="white"
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    height: verticalScale(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: moderateScale(15),
  },
  TitleWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TilteStyle: {
    fontSize: moderateScale(20),
    color: 'white',
    opacity: 0.8,
    fontFamily: 'Poppins_600SemiBold',
  },
  BellSearchWrapper: {
    flexDirection: 'row',
    gap: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeHeader;
