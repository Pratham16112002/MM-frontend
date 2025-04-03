import {
  Dimensions,
  View,
  Text,
} from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale  } from 'react-native-size-matters';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import AddRecommComponent from './AddRecomm/AddRecommComp';


const  SCREEN_HEIGHT  = Dimensions.get('window').height;
const MAX_TRANSLATION_Y = -SCREEN_HEIGHT / 1.3;



export default function AddRecomm() {
  const context = useSharedValue({ y: 0 })
  const translationY = useSharedValue<number>(0);
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {
        y: translationY.value,
      };
    })
    .onUpdate((event) => {
      translationY.value = event.translationY + context.value.y;
      translationY.value = Math.max(translationY.value, MAX_TRANSLATION_Y);
    }).onEnd(() => {
      if(translationY.value > -SCREEN_HEIGHT/4){
        translationY.value = withTiming(-SCREEN_HEIGHT/4);
      }
      if(translationY.value > MAX_TRANSLATION_Y + 100){
        translationY.value = withTiming(-SCREEN_HEIGHT/4);
      }
    })
React.useEffect(() => {
  translationY.value = withTiming(-SCREEN_HEIGHT / 4);
}, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translationY.value,
        },
      ],
    };
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    const equilizerPos = -SCREEN_HEIGHT / 4;
    const inputRange = [equilizerPos, MAX_TRANSLATION_Y];
    // Interpolating marginTop value based on translationY
    const marginTop = interpolate(
      translationY.value,
      inputRange,
      [200, 10],
      'clamp',
    );
    return {
      marginTop: marginTop,
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            borderTopLeftRadius: moderateScale(25),
            borderTopRightRadius: moderateScale(25),
            height: SCREEN_HEIGHT,
            top: SCREEN_HEIGHT,
            width: '100%',
            backgroundColor: 'rgba(56, 85, 104, 1)',
            shadowColor: '#000',
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
          },
          animatedStyle,
        ]}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              paddingTop: verticalScale(10),
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: moderateScale(15),
                fontWeight: 'bold',
                color: 'white',
              }}>
              Watched something amazing?
            </Text>
            <Text
              numberOfLines={2}
              style={{
                marginHorizontal: scale(20),
                textAlign: 'center',
                fontFamily: 'Poppins_600SemiBold',
                fontSize: moderateScale(15),
                fontWeight: 'bold',
                color: 'white',
              }}>
              Share it with your friends and make every moment count!
            </Text>
          </View>
          <Animated.View
            style={[
              {
                flex : 1,
                paddingHorizontal: scale(8),
              },
              animatedStyle2,
            ]}>
            <AddRecommComponent />
          </Animated.View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
