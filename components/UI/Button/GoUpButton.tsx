import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type Props = {
  onClick: () => void;
  sharedValue: SharedValue<number>;
};

const GoUpButton: React.FC<Props> = ({ onClick, sharedValue }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sharedValue.value,
        [0, 100],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    };
  });
  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity onPress={onClick}>
        <View style={styles.circularIconContainer}>
          <AntDesign name="up" size={moderateScale(24)} color="white" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circularIconContainer: {
    zIndex: 300,
    borderRadius: moderateScale(100),
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: verticalScale(40),
    width: scale(40),
    position: 'absolute',
    bottom: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    right: scale(30),
  },
});

export default GoUpButton;
