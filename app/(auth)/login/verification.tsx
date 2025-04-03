import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import OTPScreen from '@/components/UI/OtpScreen';
import { useOTPCtx } from '@/context/otpCtx';
import { verifyOTPForgetPassword } from '@/api/users/auth';

const VerificationPage = () => {
  const otpCtx = useOTPCtx();
  const { email } = useLocalSearchParams();
  const onSuccess = (otp: number) => {
    otpCtx.saveOtp(otp);
    router.push({
      pathname: '/(auth)/login/password',
      params: {
        email: email,
      },
    });
  };
  const onFailure = () => {
    router.dismissAll();
  };
  return (
    <OTPScreen
      email={email ? email.toString() : 'Email not found'}
      onSuccess={onSuccess}
      onFailure={onFailure}
      verificationFn={verifyOTPForgetPassword}
    />
  );
};

export default VerificationPage;
