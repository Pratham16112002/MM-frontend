import { FollowerType } from '@/app/(private)/(tabs)/friends/(section)/followers';
import React from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SmallButton from '../../Button/SmallButton';
import { APIError } from '@/utils/Exception';
import { useMutation } from '@tanstack/react-query';
import { Unfollow } from '@/api/private/peers';

interface Props {
  friend: FollowerType;
  onCardError: (error: APIError) => void;
  refechCards: () => void;
}

const FollwingCard: React.FC<Props> = ({
  friend,
  refechCards,
  onCardError,
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['unfollow', friend.username],
    mutationFn: () => {
      return Unfollow(friend.username);
    },
    onSuccess: () => {
      refechCards();
    },
    onError: (error: any) => {
      onCardError(error as APIError);
    },
  });
  return (
    <View
      key={friend.username}
      style={{
        backgroundColor: 'rgba(30,21,41,0.3)',
        padding: moderateScale(10),
        marginVertical: verticalScale(4),
        marginHorizontal: scale(7),
        borderRadius: moderateScale(4),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.2,
          }}>
          <Image
            source={{
              uri: friend.profilePic,
            }}
            style={{
              borderRadius: moderateScale(5),
            }}
            height={verticalScale(50)}
            width={scale(50)}
            resizeMode="contain"
            resizeMethod='auto'
          />
        </View>
        <View
          style={{
            flex: 0.4,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins_400Regular',
                  fontWeight: '700',
                  fontSize: moderateScale(14),
                  textAlign: 'center',
                }}>
                {friend.fullName}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontWeight: '700',
                  fontSize: moderateScale(9),
                  textAlign: 'center',
                  color: '#A3AFb8',
                }}>
                {friend.username}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(5),
          }}>
          {isPending ? (
            <ActivityIndicator size={'small'} color="white" />
          ) : (
            <SmallButton title="Remove" onClick={mutateAsync} />
          )}
        </View>
      </View>
    </View>
  );
};

export default FollwingCard;
