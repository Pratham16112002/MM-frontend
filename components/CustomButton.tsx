import { Sizes } from '@/constants/Sizes';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type Props = {
  title: string;
  onPress: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  disabled?: boolean;
};

const CustomButton: React.FC<Props> = ({ title, onPress, icon, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ height: verticalScale(40) }}
      className={` bg-error w-full rounded-xl  ${disabled ? 'opacity-50' : ''}  overflow-hidden elevation-lg`}
      onPress={onPress}>
      <View className="flex-1">
        <LinearGradient
          className="w-full h-full"
          colors={['#9C3FE4', '#5C2A2B']}
          start={[0, 0]}
          end={[1, 1]}>
          <View
            style={{ gap: scale(8) }}
            className="h-full flex-auto w-full justify-center flex-row items-center">
            {icon && (
              <Image
                source={icon}
                style={{ height: verticalScale(20), width: scale(20) }}
                resizeMethod="resize"
                resizeMode="cover"
              />
            )}
            <Text
              style={{ fontSize: moderateScale(Sizes.NormalTextSize) }}
              className="text-white font-InterSmall font-bold ">
              {title}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
