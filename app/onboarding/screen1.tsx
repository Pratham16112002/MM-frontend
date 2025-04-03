import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import Images from '@/constants/Images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Animated, { SlideInDown } from 'react-native-reanimated';
import NextButtonOnboard from '@/components/UI/Button/NextButtonOnboarding';
import { router } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';

export default function OnboardScreen1() {
  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        source={Images.onboardbg}
        style={{ flex: 1, zIndex: 0 }}
        onError={(error) =>
          console.error('Failed to load background image:', error)
        }>
        <SafeAreaView className="flex-1 justify-center">
          <View
            style={{
              height: hp(40),
              paddingHorizontal: wp(5),
              paddingVertical: hp(2),
              gap: hp(1),
            }}
            className="justify-center items-center">
            <View
              style={{ height: hp(15) }}
              className="items-center justify-center">
              <Text
                className="font-Inter font-bold text-white text-wrap text-center"
                style={{
                  fontSize: moderateScale(35),
                  fontFamily: 'Poppins_700Bold',
                }}>
                Discover movies {'\n'} you&apos;all love
              </Text>
            </View>
            <View style={{ height: hp(10) }}>
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: 'Roboto_500Medium',
                }}
                className="text-white text-center">
                Get Personalized recommendations {'\n'} based on your interests.
              </Text>
            </View>
          </View>
          <View style={{ height: hp(45) }} className="flex-row  justify-center">
            <Animated.Image
              entering={SlideInDown.duration(1000)}
              source={Images.onboard1}
              style={{
                width: wp(60),
                height: hp(60),
                position: 'absolute',
              }}
              resizeMethod={'scale'}
              resizeMode={'contain'}
            />
            <View style={{ left: wp(30) }} className="flex-col justify-end ">
              <NextButtonOnboard
                onClick={() => router.push('/onboarding/screen2')}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
