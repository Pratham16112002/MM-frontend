import { PersonalizedPickListType } from '@/types/types';
import React from 'react';
import {  View, Text, ImageBackground, ActivityIndicator, StyleSheet  } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type Props = {
  item: PersonalizedPickListType;
};

const PersonalizedPickListItem: React.FC<Props> = ({ item   }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <View
      style={{
        width: scale(75),
        height: verticalScale(80),
        marginRight: scale(10),
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Shadow position
        shadowOpacity: 0.3, // Transparency of shadow
        shadowRadius: 5, // Blur effect
        elevation: 5,
      }}>
      <View
        style={{
          position: 'absolute',
          width: scale(14),
          backgroundColor: '#99A3AA',
          borderRadius: scale(200) * verticalScale(100),
          height: verticalScale(13),
          right: scale(2),
          zIndex: 4,
        }}
      />
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          borderRadius: scale(200) * verticalScale(200),
          overflow: 'hidden',
        }}>
        <ImageBackground
          source={{
            uri: item.profilePicUrl,
          }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          resizeMethod="auto"
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}>
          {loading && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator color={'white'} size={'small'} />
            </View>
          )}
        </ImageBackground>
      </View>
      <Text
        numberOfLines={1}
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins_400Regular',
          fontSize: moderateScale(11),
          color: 'white',
        }}>
        Zishan Ahmad
      </Text>
    </View>
  );
};

export default PersonalizedPickListItem;
