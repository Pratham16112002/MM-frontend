import { verifyOTP } from '@/api/users/auth';
import OTPScreen from '@/components/UI/OtpScreen';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

const VerificationPage: React.FC = ({}) => {
  const { email } = useLocalSearchParams();
  const onSuccess = () => {
    router.push(`/(auth)/signup/profile?email=${email.toString()}`);
  };
  const onFailure = () => {
    router.dismissAll();
  };
  return (
    <OTPScreen
      email={email ? email.toString() : 'Email not found'}
      onSuccess={onSuccess}
      verificationFn={verifyOTP}
      onFailure={onFailure}
    />
  );
};

export default VerificationPage;
