import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { router } from 'expo-router';

interface ListHeaderProps {
  animatedValue: SharedValue<number>;
  genres: string;
  type: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  genres,
  animatedValue,
}) => {
  const { top } = useSafeAreaInsets();
  // TODO change the name of files and finalize this alpha effect
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 5],
      ['rgba(34, 17, 85, 0)', 'rgba(0, 0, 0, 0.7)'], // From opaque to transparent
      ),
    };
  });
  return (
    <Animated.View style={[styles.Wrapper, { paddingTop: top }, animatedStyle]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <View style={styles.TitleWrapper}>
          <Text style={styles.TilteStyle}>Movie Maven</Text>
        </View>
        <View style={styles.GenreTitleWrapper}>
          {/* Icon and Search Icon  */}
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.GenreTitleStyle}>{genres.split(',').join('/')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(110),
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
    opacity: 1,
    fontFamily: 'Poppins_600SemiBold',
  },
  GenreTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  GenreTitleStyle: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: moderateScale(18),
  },
});

export default ListHeader;
