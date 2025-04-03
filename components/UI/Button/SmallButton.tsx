import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

// import { Container } from './styles';

interface Props {
  title: string;
  onClick: () => void;
}

const SmallButton: React.FC<Props> = ({ title, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: 'transparent',
        borderRadius: moderateScale(5),
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(3),
        borderColor: '#0000009E',
        borderWidth: 1,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
      }}>
      <View>
        <Text
          numberOfLines={1}
          style={{
            color: 'white',
            fontSize: moderateScale(13),
            fontFamily: 'Poppins_600SemiBold',
            fontWeight: '700',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SmallButton;
