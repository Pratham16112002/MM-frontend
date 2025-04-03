import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Sizes } from '@/constants/Sizes';

interface Props {
  control: any;
  fieldRules: any;
  name: any;
}

const TermsAndCondition = ({ control, fieldRules, name }: Props) => {
  return (
    <View
      style={{
        marginVertical: verticalScale(8),
        paddingHorizontal: scale(8),
      }}
      className=" flex-row justify-start items-end ">
      <View className="flex-row  justify-center items-center">
        <Controller
          control={control}
          name={name}
          rules={fieldRules}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              style={{
                width: scale(10),
                height: verticalScale(10),
                marginRight: scale(8),
              }}
              value={value}
              onValueChange={onChange}
            />
          )}
        />

        <View className="items-center justify-center ">
          <Text
            style={{
              fontSize: moderateScale(Sizes.SmallTextSize),
            }}
            className="text-white font-Inter">
            I agree to the{' '}
            <Link  href={'/'}>
              <Text
                style={{
                  textDecorationLine: 'none',
                  fontSize: moderateScale(Sizes.SmallTextSize),
                }}
                className="text-link font-Inter underline">
                Terms and Conditions{' '}
              </Text>
            </Link>
            and{' '}
            <Link href={'/'}>
              <Text
                style={{
                  fontSize: moderateScale(Sizes.SmallTextSize),
                  textDecorationLine: 'none'
                }}
                className="text-link font-Inter underline">
                Privacy Policy
              </Text>
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TermsAndCondition;
