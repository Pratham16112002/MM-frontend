import React from 'react';
import { View, Text, Image } from 'react-native';
import ScreenWrapper from '@/components/UI/ScreenWrapper';
import Images from '@/constants/Images';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Sizes } from '@/constants/Sizes';

const SuccessPage = () => {
  return (
    <ScreenWrapper>
      <View style={{ padding: moderateScale(10) }} className="flex-1 flex-col ">
        <View
          style={{ height: verticalScale(100) }}
          className=" justify-end items-center w-full">
          <Image
            source={Images.success}
            style={{ width: scale(80), height: verticalScale(80) }}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            height: verticalScale(100),
            marginVertical: verticalScale(10),
          }}
          className="items-center justify-between w-full">
          <View className="flex-1 justify-center">
            <Text
              style={{ fontSize: moderateScale(Sizes.AuthTitleSize) }}
              className="font-bold text-white font-Inter">
              Password changed
            </Text>
          </View>
          <View className="flex-1 justify-center">
            <Text
              style={{ color : 'white', fontFamily : 'Inter_400Regular', fontSize: moderateScale(Sizes.AuthSubTitleSize) }}>
              Your password has been changed successfully
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: scale(10) }} className="w-full">
          <CustomButton
            title="Back to login"
            onPress={() => router.dismissTo('/(auth)/login')}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SuccessPage;
