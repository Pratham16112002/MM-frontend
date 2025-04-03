import { Modal, View, Text } from 'react-native';
import CustomButton from '../CustomButton';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Sizes } from '@/constants/Sizes';

type Props = {
  title: string;
  message: string;
  buttonTitle?: string;
  visible: boolean;
  onClose: () => void;
};

const ErrorModal: React.FC<Props> = ({ title, message, onClose, visible }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={{backgroundColor : 'rgba(0,0,0,0.8)' , flex : 1, alignItems : 'center', justifyContent: 'center', }}>
      <View
        style={{ height: verticalScale(160), padding: moderateScale(8) }}

        className=" bg-background items-center justify-between  rounded-xl elevation-2xl">
        <View
          style={{ paddingHorizontal: scale(8) }}
          className="flex-1  items-center justify-evenly">
          <View style={{ marginTop: verticalScale(4) }}>
            <Text
              style={{ fontSize: moderateScale(Sizes.AuthSubTitleSize) }}

              className="text-white font-Inter font-bold ">
              {title}
            </Text>
          </View>
            <Text numberOfLines={2} className="text-white font-Inter font-normal ">
              {message}
            </Text>
          <View className="px-5 mb-3">
            <CustomButton title={'Close'} onPress={onClose} />
          </View>
        </View>
      </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
