import { View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import icons from '@/constants/Icons';
interface Props {
  onClick: () => void;
}

export default function GoBackButton({ onClick }: Props) {
  return (
    <View
      style={{ paddingHorizontal: scale(10), top: verticalScale(40) }}
      className="flex flex-row absolute z-10  items-center justify-center  ">
      <TouchableOpacity onPress={onClick}>
        <View
          style={{ width: scale(30), height: scale(30) }}
          className="  rounded-full items-center justify-center">
          <Image
            source={icons.gobackbutton}
            resizeMode="contain"
            style={{ width: scale(20), height: verticalScale(20) }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
