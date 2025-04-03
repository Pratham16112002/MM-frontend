import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Controller, FieldError } from 'react-hook-form';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from '@expo/vector-icons/Entypo';
import { Sizes } from '@/constants/Sizes';

type Props = {
  name: any;
  title: string;
  placeholder: string;
  isSecure?: boolean;
  multiline?: boolean;
  error?: FieldError;
  control: any;
  fieldRules: any;
};

const FormField: React.FC<Props> = ({
  name,
  title,
  placeholder,
  multiline,
  isSecure,
  error,
  control,
  fieldRules,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <View
        style={{ marginVertical: verticalScale(8) }}
        className="justify-center items-start">
        <Text
          style={{
            fontSize: moderateScale(Sizes.FormLabelTitleSize),
            paddingLeft: scale(3),
          }}
          className={`${error ? 'text-error' : 'text-white'} font-Inter`}>
          {title}
        </Text>
        <View
          style={{
            height: verticalScale(35),
            paddingHorizontal: scale(10),
          }}
          className={`w-full border ${error ? 'border-error' : 'border-white'}  bg-transparent items-center justify-center rounded-lg
    flex-row`}>
          <Controller
            control={control}
            name={name}
            rules={fieldRules}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{
                  width: wp(10),
                  height: hp(10),
                  fontSize: moderateScale(Sizes.FormLabelTextSize),
                }}
                className={`flex-1  text-white font-Intersm `}
                textAlign="left"
                multiline={multiline ?? false}
                autoCapitalize="none"
                value={value}
                placeholder={placeholder}
                placeholderTextColor={error ? '#ff6b6b' : '#F5F5F5'}
                onChangeText={onChange}
                secureTextEntry={isSecure && !showPassword}
              />
            )}
          />
          {isSecure && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <View className="justify-center items-center relative">
                {showPassword ? (
                  <Entypo
                    name="eye"
                    size={moderateScale(20)}
                    color={error ? '#ff6b6b' : 'white'} // Correct ternary logic
                  />
                ) : (
                  <Entypo
                    name="eye-with-line"
                    size={moderateScale(20)}
                    color={error ? '#ff6b6b' : 'white'} // Correct ternary logic
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error !== undefined && (
        <Text
          style={{
            paddingLeft: scale(2),
            marginTop: verticalScale(1),
            fontSize: scale(Sizes.FormLabelPlaceHolderSize),
          }}
          className="text-error">
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default FormField;
