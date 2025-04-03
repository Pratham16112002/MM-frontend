import React from 'react';
import ScreenWrapper from '@/components/UI/ScreenWrapper';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import icons from '@/constants/Icons';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import GoBackButton from '@/components/UI/Button/GoBackButton';
import { Sizes } from '@/constants/Sizes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { resendOTP } from '@/api/users/auth';
import SplashScreen from '@/components/UI/SplashScreen';
import ErrorModal from '@/components/UI/ErrorModal';
import useModal from '@/hooks/ui/useModal';
import { APIError } from '@/utils/Exception';
import { GetHttpMessage } from '@/constants/Code';


interface RecoveryEmailFields {
  email: string;
}

const ForgetPasswordPage = () => {
  const { title, message, visibility, Open, Close } = useModal();
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryEmailFields>();
  const email = watch('email');
  const { isPending, mutateAsync } = useMutation({
    mutationFn: resendOTP,
    onSuccess: () => {
      router.push({
        pathname: '/(auth)/login/verification',
        params: {
          email: email,
        },
      });
    },
    onError: (error: APIError) => {
      Open(GetHttpMessage(error.code), error.message);

    },
  });
  const SubmitHandler: SubmitHandler<RecoveryEmailFields> = async (data) => {
    await mutateAsync(data.email);
  };
  if (isPending) {
    return <SplashScreen />;
  }
  return (
    <ScreenWrapper>
      <View style={{ padding: moderateScale(20) }} className="flex-1">
        <ErrorModal
          title={title}
          message={message}
          visible={visibility}
          onClose={() => {
            Close();
          }}
          buttonTitle="Close"
        />
        <GoBackButton onClick={() => router.back()} />
        <View
          style={{
            height: verticalScale(130),
            gap: verticalScale(10),
            paddingLeft: scale(8),
          }}
          className=" justify-end ">
          <Text
            style={{ fontSize: moderateScale(Sizes.AuthTitleSize  ) , fontFamily : 'Inter_700Bold'  }}
            className="text-white">
            Forget password?
          </Text>
          <Text
            style={{ fontSize: moderateScale(Sizes.AuthSubTitleSize) }}
            className="text-white font-Inter  font-light ">
            Don’t worry! It happens. Please enter the email associated with your
            account.
          </Text>
        </View>
        <View
          style={{ height: verticalScale(200), gap: verticalScale(10) }}
          className=" w-full  justify-center ">
          <FormField
            name="email"
            title="Email address"
            control={control}
            fieldRules={{ required: 'Email is required' }}
            placeholder="Enter you email address"
            error={errors.email}
          />
          <View style={{ paddingHorizontal: scale(10) }}>
            <CustomButton
              title="Send Code"
              icon={icons.send}
              onPress={handleSubmit(SubmitHandler)}
            />
          </View>
        </View>
        <View className="flex-1 justify-end items-center">
          <View>
            <TouchableOpacity
              onPress={() => {
                router.dismissTo('/(auth)/login');
              }}>
              <Text
                style={{ fontSize: moderateScale(Sizes.NormalTextSize) }}
                className="text-link font-Inter underline">
                Back to Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ForgetPasswordPage;
