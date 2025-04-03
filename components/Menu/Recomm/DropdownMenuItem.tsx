import React from 'react';
import { TouchableOpacity, Text,View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface Props {
    item : any 
}


const DropdownMenuItem: React.FC<Props> = ({item}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          paddingVertical: verticalScale(10),
          paddingHorizontal: scale(10),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: scale(10),
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: moderateScale(15),
            color: 'white',
            opacity: 0.5,
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default DropdownMenuItem;