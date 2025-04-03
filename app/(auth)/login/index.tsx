import React from 'react';
import ScreenWrapper from '@/components/UI/ScreenWrapper';
import { View, Text } from 'react-native';
import FormField from '@/components/FormField';
import { Link, useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { Image } from 'react-native';
import Icons from '@/constants/Icons';
import ErrorModal from '@/components/UI/ErrorModal';
import { login } from '@/api/users/auth';
import useModal from '@/hooks/ui/useModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Response } from '@/api/axiosConfig';
import { APIError } from '@/utils/Exception';
import { useAuth } from '@/context/ctx';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Sizes } from '@/constants/Sizes';
import { GetHttpMessage } from '@/constants/Code';


export interface LoginFormFields {
  email: string;
  password: string;
}

const LoginIn = () => {
  const { signIn } = useAuth();
  const { title, message, visibility, Open, Close } = useModal();
  const router = useRouter();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: login,
    onSuccess: async (data: Response) => {
      await signIn({
        accessToken: data.data.token,
        refreshToken: data.data.refreshToken,
      });
      router.replace('/(private)/(tabs)/home');
    },
    onError: (error: APIError) => {
      Open(GetHttpMessage(error.code), error.message);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();
  const loginHandler: SubmitHandler<LoginFormFields> = async (data) => {
    await mutateAsync({
      email: data.email,
      password: data.password,
    });
  };
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
        style={{ paddingHorizontal: scale(13), flex: 1 }}
        className="justify-center  ">
        <View
          style={{
            flex: 0.3,
          }}
          className="items-center ">
          <View className="items-center justify-center ">
            <View className="items-center">
              <Text
                numberOfLines={1}
                style={{
                  fontSize: moderateScale(Sizes.VeryLargeTitleSize),
                  color: 'white',
                  fontFamily: 'Inter_600SemiBold',
                  textAlign: 'center',
                }}>
                Movie
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: moderateScale(Sizes.VeryLargeTitleSize),
                  color: 'white',
                  fontFamily: 'Inter_600SemiBold',
                  textAlign: 'center',
                }}>
                Maven
              </Text>
            </View>
            <Text
              style={{ fontSize: moderateScale(Sizes.NormalTextSize) }}
              className="font-normal  font-InterSmall color-white">
              Watch, Recommend, Enjoy
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.2,
          }}
          className="flex-col justify-center ">
          <FormField
            title="Email"
            error={errors.email}
            placeholder="Enter your email"
            name="email"
            multiline={false}
            isSecure={false}
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
            title="Password"
            error={errors.password}
            placeholder="Enter your password"
            isSecure={true}
            multiline={false}
            control={control}
            fieldRules={{
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Password too short',
              },
            }}
            name="password"
          />
          <View
            style={{
              flex: 1,
            }}
            className="items-end justify-center">
            <View
              style={{
                marginVertical: verticalScale(15),
              }}
              className=" items-end justify-center">
              <Text
                style={{ fontSize: moderateScale(Sizes.NormalTextSize) }}
                onPress={() => router.push('/(auth)/login/forgotpassword')}
                className="text-white font-InterSmall font-semibold">
                Forgot Password?
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <View style={{ width: '100%' }}>
            <CustomButton disabled={isPending} title="Log in" onPress={handleSubmit(loginHandler)} />
          </View>

          <View
            style={{ marginVertical: verticalScale(10) }}
            className="w-full  flex-row  items-center">
            <View
              style={{ height: verticalScale(2) }}
              className="flex-auto  bg-white"
            />
            <View>
              <Text
                style={{
                  fontSize: moderateScale(Sizes.NormalTextSize),
                  paddingHorizontal: scale(7),
                }}
                className="text-white w-full text-center">
                or Sign in with
              </Text>
            </View>
            <View
              style={{ height: verticalScale(2) }}
              className="flex-auto bg-white"
            />
          </View>
          <View
            style={{ gap: scale(10) }}
            className="flex-row  w-full  justify-center  items-center">
            <Link href={'/+not-found'}>
              {' '}
              <Image
                source={Icons.facebook}
                resizeMethod="resize"
                resizeMode="contain"
                style={{ height: verticalScale(40), width: scale(40) }}
              />
            </Link>
            <Link href={'/+not-found'}>
              {' '}
              <Image
                source={Icons.google}
                resizeMethod="resize"
                resizeMode="contain"
                style={{ height: verticalScale(40), width: scale(40) }}
              />
            </Link>
          </View>
        </View>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text
            style={{ fontSize: moderateScale(Sizes.NormalTextSize) }}
            className="text-white">
            Don&apos;t have an account?{' '}
            <Link replace href={'/(auth)/signup'}>
              <Text className="text-link underline">Sign up</Text>
            </Link>
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginIn;
