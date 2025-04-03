import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import RecommSearchIconSVGComponent from '../../SVG/Recomm/AddFavPlus'
import { router } from 'expo-router'

export default function AddRecommButton() {
  return (
    <TouchableOpacity
      onPress={() => router.push('/(private)/(tabs)/recomm/modal')}>
      <View
        style={{
          width: scale(75),
          height: verticalScale(80),
          marginRight: scale(10),
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            borderRadius: moderateScale(100) * verticalScale(100),
            shadowColor: '#000', // Shadow color
            shadowOffset: { width: 0, height: 4 }, // Shadow position
            shadowOpacity: 0.3, // Transparency of shadow
            shadowRadius: 5, // Blur effect
            elevation: 5,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: scale(22),
            top: verticalScale(13),
          }}>
          <RecommSearchIconSVGComponent
            width={scale(30)}
            height={verticalScale(40)}
          />
        </View>
        <Text
          numberOfLines={1}
          style={{
            textAlign: 'center',
            fontFamily: 'Poppins_400Regular',
            fontSize: moderateScale(11),
            color: 'white',
          }}>
          Add Friend
        </Text>
      </View>
    </TouchableOpacity>
  );
}