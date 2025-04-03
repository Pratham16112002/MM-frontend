import { View, ImageBackground, SafeAreaView, Text } from 'react-native';
import React from 'react';
import Images from '@/constants/Images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import NextButtonOnboard2 from '@/components/UI/Button/NextButtonOnboard2';
import { router } from 'expo-router';
import { useOnboardScreen } from '@/context/obCtx';

export default function OnboardScreen3() {
  const { onboard } = useOnboardScreen();
  const OnBoardHandler = async () => {
    await onboard();
    router.replace('/(auth)/login');
  };
  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        source={Images.onboardbg}
        style={{ flex: 1, zIndex: 0 }}
        onError={(error) =>
          console.error('Failed to load background image:', error)
        }>
        <SafeAreaView className="flex-1 justify-end">
          <View
            style={{
              height: hp(60),
              paddingHorizontal: wp(5),
              paddingVertical: hp(2),
              gap: hp(1),
            }}
            className="items-center justify-center ">
            <LinearGradient
              colors={['#0000', '#180f2e', '#010101']}
              className="h-full w-full items-center justify-center">
              <View
                style={{
                  gap: hp(3),
                  padding: moderateScale(25),
                }}
                className="items-center justify-center">
                <Animated.View
                  entering={SlideInRight.duration(1000)}
                  className="items-center justify-center">
                  <Text
                    style={{
                      fontFamily: 'Poppins_700Bold',
                      fontSize: moderateScale(25),
                    }}
                    className="text-white">
                    Discover new content
                  </Text>
                </Animated.View>
                <Animated.View
                  entering={SlideInLeft.duration(1000)}
                  className="items-center justify-center ">
                  <Text
                    style={{
                      fontFamily: 'Poppins_400Regular',
                      fontSize: moderateScale(15),
                    }}
                    className="text-center text-white">
                    Explore trending movies and shows{'\n'}recommended for you.
                  </Text>
                </Animated.View>
                <NextButtonOnboard2 onClick={OnBoardHandler} />
              </View>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
