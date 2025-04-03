import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import Images from '@/constants/Images';
import { StatusBar } from 'expo-status-bar';
import NextButtonOnboard from '@/components/UI/Button/NextButtonOnboarding';
import { router } from 'expo-router';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export default function Screen0() {
  const nextHandler = () => {
    router.push('/onboarding/screen1');
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
              flex: 1,
              paddingHorizontal: scale(5),
              paddingVertical: verticalScale(4),
              gap: verticalScale(2),
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <View style={{ flex: 0.5 }}>
              <View
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  paddingBottom: verticalScale(10),
                }}>
                <Text
                  className="font-Inter font-bold text-white text-wrap"
                  style={{
                    fontSize: moderateScale(30),
                    fontFamily: 'Poppins_700Bold',
                  }}>
                  Welcome to {'\n'} Movie Maven!
                </Text>
              </View>
            </View>
            <View
              style={{ display: 'flex', paddingHorizontal : scale(10) , paddingVertical : verticalScale(10) ,  justifyContent: 'flex-start' }}
              className="text-wrap ">
              <Text
                style={{
                  fontSize: moderateScale(20),
                  fontFamily: 'Roboto_500Medium',
                }}
                className="text-white text-wrap ">
                Your personalized movie & series recommentation app.
              </Text>
            </View>
            <View
              style={{ display : 'flex' , alignItems : 'flex-end', paddingRight : scale(20) , width : '100%' }}>
              <NextButtonOnboard onClick={nextHandler} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
