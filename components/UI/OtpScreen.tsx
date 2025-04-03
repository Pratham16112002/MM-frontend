import { resendOTP, VerifyOTPPayload } from '@/api/users/auth';
import CustomButton from '@/components/CustomButton';
import ErrorModal from '@/components/UI/ErrorModal';
import ResendOtpTimer from '@/components/UI/Input/ResendOtpTimer';
import SplitInputField from '@/components/UI/Input/SplitInputFied';
import ScreenWrapper from '@/components/UI/ScreenWrapper';
import { Sizes } from '@/constants/Sizes';
import useModal from '@/hooks/ui/useModal';
import useOTP, { messageType } from '@/hooks/ui/useOTP';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import GoBackButton from './Button/GoBackButton';
import { useMutation } from '@tanstack/react-query';
import { APIError } from '@/utils/Exception';

interface Props {
  email: string;
  onSuccess: (otp: number) => void;
  onFailure: () => void;
  verificationFn: (payload: VerifyOTPPayload) => Promise<any>;
}

const OTPScreen: React.FC<Props> = ({
  email,
  onSuccess,
  onFailure,
  verificationFn,
}) => {
  const { title, message, visibility, Close } = useModal();
  const {
    otp,
    setOTP,
    otpMessage,
    setOtpMessage,
    timeLeft,
    targetTime,
    triggerTime,
    activeResend,
    isOTPValid,
  } = useOTP();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: verificationFn,
    onSuccess() {
      setOtpMessage({
        type: messageType.SUCCESS,
        message: 'OTP verfied',
      });
      onSuccess(+otp);
    },
    onError(error: APIError) {
      setOtpMessage({
        type: messageType.ERROR,
        message: error.message,
      });
    },
  });
  const { isPending: isPending2, mutateAsync: mutateAsyncResendOTP } =
    useMutation({
      mutationFn: resendOTP,
      onSuccess() {
        setOtpMessage({
          type: messageType.SUCCESS,
          message: 'OTP sent succussfully',
        });
      },
      onError(error: APIError) {
        setOtpMessage({
          type: messageType.ERROR,
          message: error.message,
        });
      },
    });
  const verifyOTPHandler = async () => {
    if (!isOTPValid) {
      return;
    }
    const payload = {
      otp: +otp,
      email: email.toString(),
    };
    await mutateAsync(payload);
  };
  const resendOPTHandler = async () => {
    await mutateAsyncResendOTP(email.toString());
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <ErrorModal
          title={title}
          message={message}
          visible={visibility}
          onClose={() => {
            Close();
            onFailure();
          }}
          buttonTitle="Close"
        />
        <View style={{ paddingHorizontal: scale(8) }} className="flex-1">
          <GoBackButton onClick={() => router.back()} />
          <View
            style={{ height: verticalScale(140), paddingLeft: scale(10) }}
            className="  justify-end ">
            <View style={{ height: verticalScale(100) }} className=" gap-1">
              <View className="flex-auto items-start  justify-end">
                <Text
                  style={{ fontSize: moderateScale(Sizes.AuthTitleSize, 0.3) }}
                  className=" text-white font-Inter font-bold">
                  Please check your email
                </Text>
              </View>
              <View className="flex-1 items-start justify-center">
                <Text
                numberOfLines={1}
                  style={{ fontSize: moderateScale(Sizes.NormalTextSize, 0.1) }}
                  className=" text-white font-Inter">
                  We&apos;ve sent a code to{' '}
                  <Text
                    style={{
                      fontSize: moderateScale(Sizes.NormalTextSize, 0.1),
                    }}
                    className=" text-white font-Inter font-semibold text-wrap">
                    {email}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: verticalScale(120),
              paddingHorizontal: verticalScale(8),
            }}
            className=" flex-col items-center gap-5">
            <View style={{ height: verticalScale(80), width: scale(300) }}>
              <SplitInputField
                value={otp}
                maxLength={4}
                onChange={(e: string) => {
                  setOTP(e);
                }}
              />
            </View>
            {otpMessage != undefined && (
              <View className="jusity-center items-center">
                <Text
                  style={{ fontSize: moderateScale(Sizes.NormalTextSize) }}
                  className={`${otpMessage.type == messageType.ERROR ? 'text-error' : 'text-success'}  font-InterItalic`}>
                  {otpMessage.message}
                </Text>
              </View>
            )}
            <View
              style={{
                height: verticalScale(50),
              }}
              className="flex-col w-full items-center justify-center  ">
              <View style={{ paddingHorizontal: scale(2) }}>
                <CustomButton
                  disabled={isPending || isPending2 || !isOTPValid}
                  title="Verify OTP"
                  onPress={verifyOTPHandler}
                />
              </View>
            </View>
            <ResendOtpTimer
              resendOTPHandler={resendOPTHandler}
              timeLeft={timeLeft}
              targetTime={targetTime}
              triggerTime={triggerTime}
              activeResend={activeResend}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default OTPScreen;
