import React from 'react';
import { Stack } from 'expo-router';
import { Image } from 'react-native';
import Images from '@/constants/Images';
import { scale, verticalScale } from 'react-native-size-matters';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Go Back' }} />
      <Image
        source={Images.construction}
        resizeMode="contain"
        style={{ height: verticalScale(200), width: scale(200) }}
      />
    </>
  );
}
