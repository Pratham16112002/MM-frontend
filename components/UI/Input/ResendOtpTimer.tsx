import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Sizes } from '@/constants/Sizes';

type Props = {
  //   resendEmail: number | null;
  resendOTPHandler: () => void;
  timeLeft: number | null;
  targetTime: number | null;
  triggerTime: () => void;
  activeResend: boolean;
};

const ResendOtpTimer: React.FC<Props> = ({
  //   resendEmail,
  resendOTPHandler,
  timeLeft,
  targetTime,
  triggerTime,
  activeResend,
}) => {
  return (
    <View className="items-center">
      <Text
        style={{ fontSize: moderateScale(Sizes.NormalTextSize) }}
        className="text-white ">
        Didn&apos;t receieve OTP ?
      </Text>
      {activeResend ? (
        <TouchableOpacity
          onPress={() => {
            triggerTime();
            resendOTPHandler();
          }}
          className={`${activeResend ? 'opacity-100' : 'opacity-50 disabled'} mt-3`}>
          <Text className="text-link">Resend OTP</Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={{
            marginTop: verticalScale(10),
            fontSize: moderateScale(Sizes.NormalTextSize),
          }}
          className="text-gray ">
          Request new code in{' '}
          <Text
            style={{ fontSize: moderateScale(Sizes.NormalTextSize) }}
            className="text-white">
            {timeLeft}s
          </Text>
        </Text>
      )}
    </View>
  );
};

export default ResendOtpTimer;
