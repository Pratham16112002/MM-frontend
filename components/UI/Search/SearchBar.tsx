import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SearchIconSVGComponent from '../SVG/SearchIcon';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
interface Props {
  animatedValue: SharedValue<number>;
  onChange: (text: string) => void;
}

const headerHeight = verticalScale(50);

const SearchBarCustomHeader: React.FC<Props> = ({
  animatedValue,
  onChange,
}) => {
  const { top } = useSafeAreaInsets();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 5],
        ['rgba(34, 17, 85, 0)', 'rgba(0, 0, 0, 0.7)'],
      ),
    };
  });
  const searchAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedValue.value,
            [0, 100],
            [0, -50],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  const scrollAnimation = useAnimatedStyle(() => {
    return {
      height : (interpolate(animatedValue.value, [0, 100], [headerHeight, 0], Extrapolation.CLAMP))
    } 
  })
  const [search , setSearch ] = React.useState<string>('');
  return (
    <Animated.View
      style={[
        { paddingTop: top },
        animatedStyle,
      ]}>
      <View
        style={{
          height: verticalScale(75),
          padding: moderateScale(15),
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: verticalScale(8),
        }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back-sharp"
            size={moderateScale(30)}
            color="white"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Poppins_600SemiBold',
            paddingLeft: scale(10),
            fontSize: moderateScale(20),
          }}>
          Movie Maven
        </Text>
      </View>
      <Animated.View
        style={[scrollAnimation,{
          height: verticalScale(50),
          overflow: 'hidden',
          position: 'relative',
        }]}>
        <Animated.View
          style={[
            searchAnimatedStyle,
            {
              width: scale(330),
              position: 'absolute',
              left: scale(10),
              flexDirection: 'row',
              height: verticalScale(35),
              backgroundColor: 'white',
              borderRadius: moderateScale(12),
              overflow: 'hidden',
              paddingRight: scale(10),
            },
          ]}>
          <SearchIconSVGComponent
            width={scale(35)}
            height={verticalScale(35)}
          />
          <TextInput
            value={search}
            onChangeText={(text: string) => {
              onChange(text);
              setSearch(prev => {
               prev = text
               return prev
              })
            }}
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: moderateScale(18),
              flex: 1,
              paddingVertical: 0,
            }}
            placeholder="Search in Movie Maven"
            placeholderTextColor={'#7f7f84'}
            textAlign="left"
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default SearchBarCustomHeader;
