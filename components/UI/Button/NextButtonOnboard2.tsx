import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface Props {
  onClick: () => void;
}

const NextButtonOnboard2: React.FC<Props> = ({ onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: wp(60),
        height: hp(6),
        borderRadius: wp(12),
      }}
      className="bg-link">
      <LinearGradient
        style={{
          width: '100%',
          height: '100%',
          borderRadius: wp(12),
        }}
        className="w-full h-full rounded-full"
        start={[0, 0]}
        end={[1, 0]}
        colors={['#070303', '#5C2750', '#9B3fE0']}>
        <View className="h-full w-full justify-center items-center">
          <Text
            style={{
              fontSize: hp(2),
              fontFamily: 'Poppins_400Regular',
            }}
            className="text-white">
            Next
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NextButtonOnboard2;
