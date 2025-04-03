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

export default function OnboardScreen3() {
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
                  className="items-center justify-center"
                  entering={SlideInRight.duration(1000)}>
                  <Text
                    style={{
                      fontFamily: 'Poppins_700Bold',
                      fontSize: moderateScale(25),
                    }}
                    className="text-white">
                    Track your watchlist
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
                    Add movies and shows to your{'\n'}watchlist and never miss
                    your{'\n'}
                    next favorite
                  </Text>
                </Animated.View>
                <NextButtonOnboard2
                  onClick={() => router.push('/onboarding/screen4')}
                />
              </View>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
