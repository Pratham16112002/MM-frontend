import {StyleSheet,Image, View, Text  } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import SmallButton from '@/components/UI/Button/SmallButton'



interface Props {
    fullName : string,
    username : string,
    profilePicUrl : string
}

const SpotlightComponent: React.FC<Props> = ({fullName , username , profilePicUrl}) => {
    return (
      <View style={styles.card}>
        {/* Profile Picture */}
        <View style={styles.ImageWrapper}>
          <Image source={{ uri: profilePicUrl }} style={styles.profilePic} />
        </View>
        <View style={styles.InfoWrapper}>
          <Text numberOfLines={1} style={styles.fullName}>{fullName}</Text>
          <Text numberOfLines={1} style={styles.username}>@{username}</Text>
        </View>

        <View style={styles.ButtonWrapper}>
          <SmallButton
            title={'Add to Spotlight'}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    gap : scale(8),
    backgroundColor: 'rgba(30,21,41,0.3)',
    borderRadius: moderateScale(12),
    padding: scale(12),
    marginVertical: verticalScale(8),
    marginHorizontal: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  ImageWrapper: {
    flex: 0.2,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    marginBottom: verticalScale(8),
    overflow: 'hidden',
  },
  InfoWrapper: {
    flex: 0.4,
    flexDirection : 'column',
    justifyContent : 'flex-start',
    alignItems : 'flex-start',
  },
  ButtonWrapper : {
    flex : 0.48,
    paddingHorizontal : scale(8),
  },
  profilePic: {
    flex : 1,
  },
  fullName: {
    fontSize: moderateScale(16),
    fontFamily : 'Poppins_600SemiBold',
    color: 'white',
  },
  username: {
    fontSize: moderateScale(14),
    fontFamily : 'Poppins_600SemiBold',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: verticalScale(8),
  },
});

export default SpotlightComponent;