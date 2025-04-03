import React from 'react'

import HomeScreenWrapper from '@/components/UI/Wrappers/HomeScreenWrapper';
import {  FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Ionicons from '@expo/vector-icons/Ionicons';
import SpotLightComponent from './SpotlightComponent/SpotLightComponent';
import { SpotLightCardType } from '@/types/types';
import { router } from 'expo-router';
const spotLightCards: SpotLightCardType[] = [
  {
    username: 'johndoe123',
    profilePicUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    fullName: 'John Doe',
  },
  {
    username: 'janedoe456',
    profilePicUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    fullName: 'Jane Doe',
  },
  {
    username: 'alexsmith789',
    profilePicUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    fullName: 'Alex Smith',
  },
  {
    username: 'emilyjones321',
    profilePicUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    fullName: 'Emily Jones',
  },
  {
    username: 'michaelbrown654',
    profilePicUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    fullName: 'Michael Brown',
  },
];

export default function SpotLightPage() {
  return (
    <HomeScreenWrapper>
      <View style={{ flex: 1, padding: moderateScale(10) , marginTop : verticalScale(30) }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: verticalScale(28),
            left: scale(15),
          }}
          onPress={() => router.back()}>
          <View>
            <Ionicons
              name="arrow-back"
              size={moderateScale(24)}
              color="white"
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginLeft: scale(50),
            backgroundColor: 'white',
            borderRadius: moderateScale(14),
            paddingHorizontal: scale(10),
            marginVertical: verticalScale(10),
          }}>
          <TextInput
            onChangeText={() => null}
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: moderateScale(18),
              paddingVertical: 0,
              height: verticalScale(37),
            }}
            placeholder="Search in Movie Maven"
            placeholderTextColor={'#7f7f84'}
            textAlign="left"
          />
        </View>
        <FlatList
          data={spotLightCards as SpotLightCardType[]}
          renderItem={({ item, index }) => {
            return (
              <SpotLightComponent
                fullName={item.fullName}
                username={item.username}
                profilePicUrl={item.profilePicUrl}
                key={index}
              />
            );
          }}
        />
      </View>
    </HomeScreenWrapper>
  );
}