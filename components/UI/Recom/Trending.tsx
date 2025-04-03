import React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import TrendingList from './TrendingList';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropdownMenuRecomComp, { DropdownMenuRecomCompRef } from '@/components/Menu/Recomm/DropdownMenu';

// import { Container } from './styles';

const TrendingRecomm: React.FC = () => {
  const DropdownRef = React.useRef<DropdownMenuRecomCompRef>(null);
  return (
    <View
      style={{
        marginTop: Platform.OS == 'ios' ? verticalScale(93) : verticalScale(60),
        flex: 1,
        overflow: 'hidden',
      }}>
      <DropdownMenuRecomComp ref={DropdownRef} />
      <View
        style={{
          paddingVertical: verticalScale(8),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: moderateScale(25),
            color: 'white',
          }}>
          Trending among peers
        </Text>
        <View
          style={{
            marginVertical: verticalScale(8),
            flexDirection: 'row',
            justifyContent: 'center',
            gap: scale(10),
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Poppins_500Medium',
              fontSize: moderateScale(15),
              color: 'white',
              opacity: 0.5,
            }}>
            Recent Recomm
          </Text>
          <TouchableOpacity onPress={() => DropdownRef.current?.openDropdownMenu()}>
            <AntDesign
              name="down"
              size={moderateScale(18)}
              color="rgba(255,255,255,0.5)"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: scale(12),
        }}>
        <TrendingList />
      </View>
    </View>
  );
};

export default TrendingRecomm;
