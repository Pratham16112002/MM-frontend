import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import Images from '@/constants/Images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn } from 'react-native-reanimated';
import NextButtonOnboard from '@/components/UI/Button/NextButtonOnboarding';
import { router } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';

export default function OnboardScreen2() {
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
              height: hp(40),
              paddingHorizontal: wp(5),
              paddingVertical: hp(2),
              gap: hp(0.5),
            }}
            className="justify-center">
            <Animated.View
              entering={FadeIn.duration(1000)}
              style={{ height: hp(16) }}>
              <Text
                className="font-Inter font-bold text-white text-wrap "
                style={{
                  fontSize: moderateScale(35),
                  fontFamily: 'Poppins_400Regular',
                }}>
                Share with {'\n'}friends
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeIn.duration(1000)}
              style={{ height: hp(10), paddingRight: wp(30) }}>
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: 'Roboto_500Medium',
                }}
                className="text-white ">
                Share your favorite picks with{'\n'}friends and see their{'\n'}
                suggestions.
              </Text>
            </Animated.View>
            <View
              style={{ height: hp(10) }}
              className="items-end justify-center ">
              <NextButtonOnboard
                onClick={() => router.push('/onboarding/screen3')}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
