
import React from 'react'
import HomeScreenWrapper from '@/components/UI/Wrappers/HomeScreenWrapper';
import {  TextInput, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export default function SpotLightPage() {
  return (
    <HomeScreenWrapper>
      <View style={{ flex: 1, padding: moderateScale(10) }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: moderateScale(14),
            paddingHorizontal: scale(10),
            marginVertical: verticalScale(10),
          }}>
          <TextInput
            onChangeText={() => null}
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: moderateScale(18),
              paddingVertical: 0,
              height: verticalScale(37),
            }}
            placeholder="Search in Movie Maven"
            placeholderTextColor={'#7f7f84'}
            textAlign="left"
          />
        </View>
      </View>
    </HomeScreenWrapper>
  );
}