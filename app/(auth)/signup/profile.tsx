import { router, useLocalSearchParams } from 'expo-router';

import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import React from 'react';
import ErrorModal from '@/components/UI/ErrorModal';
import { TouchableOpacity, View, Image, Text, ScrollView } from 'react-native';
import ScreenWrapper from '@/components/UI/ScreenWrapper';
import Images from '@/constants/Images';
import icons from '@/constants/Icons';
import useModal from '@/hooks/ui/useModal';
import useImagePicker from '@/hooks/ui/useImagePicker';
import { SetUpProfile } from '@/api/users/profile';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Sizes } from '@/constants/Sizes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { APIError } from '@/utils/Exception';
import SplashScreen from '@/components/UI/SplashScreen';

interface ProfileFormFileds {
  username: string;
}

const ProfilePage: React.FC = ({}) => {
  const { email } = useLocalSearchParams();
  const { profilePic, profilePicFile, pickImage } = useImagePicker();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormFileds>({});
  const { visibility, title, message, Open, Close } = useModal();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: SetUpProfile,
    onSuccess: () => {
      router.navigate('/(auth)/login');
    },
    onError: (error: APIError) => {
      Open(error.code.toString(), error.message);
    },
  });

  const finishHandler: SubmitHandler<ProfileFormFileds> = async (data) => {
    const f_data = new FormData();
    f_data.append('email', email.toString());
    f_data.append('profile-pic', profilePicFile as unknown as File);
    const payload = {
      email: email.toString(),
      username: data.username,
    };
    await mutateAsync({
      payload: payload,
      formData: f_data,
    });
  };
  if (isPending) {
    return <SplashScreen />;
  }

  return (
    <ScreenWrapper>
      <View style={{ paddingHorizontal: scale(8) }} className="flex-1">
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
          style={{ height: scale(150), padding: scale(8) }}
          className=" flex-col items-start  justify-center gap-4 ">
          <View>
            <Text
              style={{ fontSize: moderateScale(Sizes.AuthTitleSize, 0.3) }}
              className=" text-white font-Inter font-bold">
              Set up your profile
            </Text>
          </View>
          <View>
            <Text
              style={{ fontSize: moderateScale(Sizes.AuthSubTitleSize) }}
              className=" text-white font-Inter ">
              Add your identify with a photo of yours
            </Text>
          </View>
        </View>
        <View
          style={{ height: verticalScale(110) }}
          className="items-center justify-center ">
          <View className="flex-1  w-full items-center">
            <View className="flex-1 items-center justify-center">
              <View className="flex-auto items-center justify-start">
                <TouchableOpacity className="rounded-full " onPress={pickImage}>
                  {profilePic == undefined ? (
                    <Image
                      source={Images.anonymous}
                      style={{
                        height: verticalScale(90),
                        width: scale(90),
                      }}
                      className="rounded-full"
                      resizeMode="contain"
                      resizeMethod="resize"
                    />
                  ) : (
                    <Image
                      source={{ uri: profilePic! }}
                      style={{
                        height: verticalScale(90),
                        width: scale(90),
                      }}
                      className="rounded-full"
                      resizeMode="cover"
                      resizeMethod="auto"
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{
                      height: verticalScale(30),
                      width: scale(30),
                      left: scale(30),
                      bottom: verticalScale(30),
                    }}
                    source={icons.addimage}
                    className="relative "
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: verticalScale(150) }} className="justify-end ">
          <View
            style={{ paddingVertical: verticalScale(8) }}
            className="flex-1">
            <FormField
              control={control}
              name="username"
              fieldRules={{ required: 'Username is required' }}
              title="User name"
              placeholder="Enter your user name"
              error={errors.username}
            />
          </View>
          <View
            style={{ paddingBottom: verticalScale(12) }}
            className="flex-1 justify-end">
            <CustomButton
              title="Finish"
              onPress={handleSubmit(finishHandler)}
              disabled={false}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfilePage;
