import React from 'react';
import HomeScreenWrapper from '../../Wrappers/HomeScreenWrapper';
import { View, Image } from 'react-native';
import Images from '@/constants/Images';
import { scale, verticalScale } from 'react-native-size-matters';

const ErrorState = () => {
  return (
    <HomeScreenWrapper>
      <View style={{ flex: 1 , justifyContent : 'center' , alignItems : 'center', marginTop: verticalScale(20) }}>
        <Image
          source={Images.error}
          style={{ height: verticalScale(100), width: scale(100) }}
          resizeMethod="auto"
          resizeMode="contain"
        />
      </View>
    </HomeScreenWrapper>
  );
};

export default ErrorState;
