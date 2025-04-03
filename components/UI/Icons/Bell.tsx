import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Animated, { FadeIn } from 'react-native-reanimated';

// import { Container } from './styles';

const Bell: React.FC = () => {
  return (
    <Animated.View entering={FadeIn} style={styles.bellWrapper}>
      <TouchableOpacity>
        <FontAwesome name="bell" size={moderateScale(25)} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bellWrapper: {
    height: verticalScale(30),
    right: scale(10),
    width: scale(55),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
});

export default Bell;
