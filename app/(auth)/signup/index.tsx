import ScreenWrapper from '@/components/UI/ScreenWrapper';
import Images from '@/constants/Images';
import FormField from '@/components/FormField';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import React from 'react';
import { Image, Text, View } from 'react-native';
import ErrorModal from '@/components/UI/ErrorModal';
import { signUp } from '@/api/users/auth';
import useModal from '@/hooks/ui/useModal';
import { useMutation } from '@tanstack/react-query';
import { APIError } from '@/utils/Exception';
import { SubmitHandler, useForm } from 'react-hook-form';
import TermsAndCondition from '@/components/UI/Input/TermsAndCondition';
import SplashScreen from '@/components/UI/SplashScreen';

import { moderateScale, scale } from 'react-native-size-matters';

import { Sizes } from '@/constants/Sizes';
import { getErrorMessage } from '@/constants/Codes';

interface SignUpFormFileds {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const SignUp = () => {
  // const [loading, setLoading] = React.useState<boolean>(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFileds>();
  const password = watch('password');
  const email = watch('email');
  const { title, message, visibility, Open, Close } = useModal();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push(`/(auth)/signup/verification?email=${email}`);
    },
    onError: (error: APIError) => {
      Open(getErrorMessage(error.code), error.message);
    },
  });
  const SignUpHandler: SubmitHandler<SignUpFormFileds> = async (data) => {
    await mutateAsync({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
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
        <View
          style={{ flex : 1, justifyContent: 'center', paddingHorizontal: scale(10) }}>
          <View style={{
            flex : 0.1,
            justifyContent : 'center',
            alignItems : 'center'
          }} >
            <View className=" flex-auto  items-center justify-center">
              <Text
              numberOfLines={1}

                style={{ fontSize: moderateScale(Sizes.AuthTitleSize) }}
                className=" text-white font-Intersm font-bold">
                Create Your Account
              </Text>
            </View>
            <Image
              source={Images.signupimg}
              resizeMethod="auto"
              resizeMode="contain"
              style={{ width: scale(150) }}
            />
            <Text
              style={{
                fontSize: moderateScale(Sizes.AuthSubTitleSize),

              }}
              className="text-white font-medium">
              Join with others
            </Text>
          </View>
          <View style={{
            flex : 0.3,
            flexDirection : 'column',
            justifyContent : 'center',
          }}>
            <FormField
              name="fullName"
              title="Full name"
              placeholder="Enter your full Name"
              isSecure={false}
              error={errors.fullName}
              control={control}
              fieldRules={{
                required: 'Full name is mandatory',
              }}
            />
            <FormField
              title="Email"
              name="email"
              placeholder="Enter your email"
              isSecure={false}
              error={errors.email}
              control={control}
              fieldRules={{
                required: 'Email is required',
                pattern: {
                  value: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i,
                  message: 'Email not valid',
                },
              }}
            />
            <FormField
              control={control}
              title="Password"
              name="password"
              placeholder="Enter your password"
              isSecure={true}
              error={errors.password}
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
              control={control}
              title="Confirm password"
              name="confirmPassword"
              placeholder="Confirm Password"
              isSecure={true}
              error={errors.confirmPassword}
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
          <View style={{ flex : 0.3, gap: scale(10),    justifyContent: 'space-evenly', }}>

            <TermsAndCondition
              control={control}
              fieldRules={{ required: true }}
              name="terms"
            />
            <View style={{ paddingHorizontal: scale(8) }}>
              <CustomButton
                title="Sign up"
                onPress={handleSubmit(SignUpHandler)}
              />
            </View>

            <View className="items-center ">
              <Text style={{ fontSize: moderateScale(Sizes.NormalTextSize) }} className="text-white ">

                Already have an account?{' '}
                <Link
                  href={{
                    pathname: '/(auth)/login',
                  }}>
                  <Text className="text-link underline">Sign in</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>

    </ScreenWrapper>
  );
};

export default SignUp;
