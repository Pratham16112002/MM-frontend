import React from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '@/components/UI/ScreenWrapper';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Sizes } from '@/constants/Sizes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/users/auth';
import ErrorModal from '@/components/UI/ErrorModal';
import useModal from '@/hooks/ui/useModal';
import { APIError } from '@/utils/Exception';
import { router, useLocalSearchParams } from 'expo-router';
import { useOTPCtx } from '@/context/otpCtx';
import SplashScreen from '@/components/UI/SplashScreen';

interface SetNewPasswordFormFields {
  newPassword: string;
  confirmNewPassword: string;
}

const SetPasswordPage = () => {
  const { otp, deleteOtp } = useOTPCtx();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      deleteOtp();
      router.push('/(auth)/login/success');
    },
    onError: (error: APIError) => {
      Open(error.code.toString(), error.message);
    },
  });
  const { email } = useLocalSearchParams();
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetNewPasswordFormFields>();
  const { title, message, visibility, Close, Open } = useModal();

  const password = watch('newPassword');
  const ConfirmHandler: SubmitHandler<SetNewPasswordFormFields> = async (
    data,
  ) => {
    if (!otp) {
      Open('Oops', 'No otp Found');
    }
    await mutateAsync({
      otp: otp!,
      email: email.toString(),
      newPassword: data.newPassword,
    });
  };
  if (isPending) {
    return <SplashScreen />;
  }
  return (
    <ScreenWrapper>
      <ErrorModal
        title={title}
        message={message}
        visible={visibility}
        onClose={() => {
          Close();
        }}
        buttonTitle="Close"
      />
      <View style={{ padding: moderateScale(20) }} className="flex-1">
        <View className="flex-1 flex-col ">
          <View
            style={{ padding: moderateScale(8), height: verticalScale(100) }}
            className=" flex-col  justify-center items-start">
            <View
              style={{ paddingBottom: verticalScale(10) }}
              className="flex-1 justify-end ">
              <Text
                style={{ fontSize: moderateScale(Sizes.AuthTitleSize) }}
                className="font-Inter text-white  font-bold ">
                Set a new Password
              </Text>
            </View>
            <View className=" justify-end ">
              <Text
                style={{ fontSize: moderateScale(Sizes.AuthSubTitleSize) }}
                className="font-Inter text-white ">
                Enter your new secure password ?
              </Text>
            </View>
          </View>
          <View style={{ padding: moderateScale(8) }}>
            <FormField
              title={'New password'}
              error={errors.newPassword}
              control={control}
              name="newPassword"
              placeholder={'Enter your new password'}
              isSecure={false}
              fieldRules={{
                required: 'Password is required',
                pattern: {
                  minLength: {
                    value: 3,
                    message: 'Password too short',
                  },
                },
              }}
            />
            <FormField
              title={'Confirm password'}
              placeholder={'Confirm password'}
              error={errors.confirmNewPassword}
              isSecure={false}
              name="confirmNewPassword"
              control={control}
              fieldRules={{
                required: 'Please confirm your password',
                validate: (confirmPassword: string) => {
                  return (
                    confirmPassword === password || 'Passwords do not match'
                  );
                },
              }}
            />
          </View>
          <View className="p-3">
            <CustomButton
              title={'Confirm'}
              disabled={isPending}
              onPress={handleSubmit(ConfirmHandler)}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SetPasswordPage;
