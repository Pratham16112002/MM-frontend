import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { router } from 'expo-router';

const FriendHeader = () => {
  const { top } = useSafeAreaInsets();
  // TODO change the name of files and finalize this alpha effect

  return (
    <View style={[styles.Wrapper, { paddingTop: top }]}>
      <View style={styles.TitleWrapper}>
        <Text style={styles.TilteStyle}>Maven Friends</Text>
      </View>
      <View style={styles.BellSearchWrapper}>
        {/* Icon and Search Icon  */}
        <TouchableOpacity onPress={() => router.push('/(private)/peer')}>
          <Feather
            name="search"
            style={{
              opacity: 0.8,
            }}
            size={moderateScale(20)}
            color="white"
          />
        </TouchableOpacity>
        <FontAwesome
          name="bell"
          style={{
            opacity: 0.8,
          }}
          size={moderateScale(20)}
          color="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    height: verticalScale(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: moderateScale(15),
  },
  TitleWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TilteStyle: {
    fontSize: moderateScale(20),
    color: 'white',
    opacity: 0.8,
    fontFamily: 'Poppins_600SemiBold',
  },
  BellSearchWrapper: {
    flexDirection: 'row',
    gap: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendHeader;
