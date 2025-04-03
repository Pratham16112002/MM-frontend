import { FreindRequestType } from '@/app/(private)/(tabs)/friends/(section)/requests';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SmallButton from '../../Button/SmallButton';
import { useMutation } from '@tanstack/react-query';
import { ResponseVerdict } from '@/api/private/peers';
import { APIError } from '@/utils/Exception';

interface Props {
  friend: FreindRequestType;
  onRemove: () => void;
  onCardError: (error: APIError) => void;
}

const FriendRequestCard: React.FC<Props> = ({
  friend,
  onRemove,
  onCardError,
}) => {
  const [requestAccepted, setRequestAccepted] = useState<boolean>(false);
  const {  mutateAsync ,  isPending } = useMutation({
    mutationKey: ['request', 'verdict', friend.username],
    mutationFn: (status: 'accepted' | 'rejected') =>
      ResponseVerdict(friend.username, status),
  });

  const vertidctHandler = (verdict: 'accepted' | 'rejected') => {
    mutateAsync(verdict, {
      onSuccess: () => {
        if (verdict == 'accepted') {
          setRequestAccepted(true);
        } else {
          onRemove();
        }
      },
      onError: (error: Error) => onCardError(error as APIError),
    });
  };

  if (isPending) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }
  return (
    <View
      style={{
        backgroundColor: 'rgba(30,21,41,0.5)',
        padding: moderateScale(10),
        marginVertical: verticalScale(4),
        marginHorizontal: scale(7),
        borderRadius: moderateScale(4),
        shadowColor: 'rgba(30,21,41,0.5)',
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
              height: verticalScale(50),
              width: scale(50),
            }}
            resizeMethod="auto"
            resizeMode="contain"
            style={{
              borderRadius: moderateScale(5),
            }}
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
                {friend.username}
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
                DrugDealer69
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
            <ActivityIndicator color={'white'} size={'small'} />
          ) : requestAccepted ? (
            <SmallButton title="Suggest" onClick={() => null} />
          ) : (
            <>
              <SmallButton
                title="Accept"
                onClick={() => vertidctHandler('accepted')}
              />
              <SmallButton
                title="Decline"
                onClick={() => vertidctHandler('rejected')}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default FriendRequestCard;
