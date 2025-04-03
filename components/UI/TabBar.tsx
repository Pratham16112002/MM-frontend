/* eslint-disable react/prop-types */
import RecommendationSVGComponent from './SVG/TabBar/Recommendations';
import HomePageTabBarSVGComponent from './SVG/TabBar/Home';
import FriendsSVGComponent from './SVG/TabBar/Friends';
import ProfileSVGComponent from './SVG/TabBar/Profile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity, View, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TAB_ICONS = {
  home: HomePageTabBarSVGComponent,
  recomm: RecommendationSVGComponent,
  friends: FriendsSVGComponent,
  profile: ProfileSVGComponent,
};

const TAB_TITLES = {
  home: 'Home',
  recomm: 'Recom.',
  friends: 'Friends',
  profile: 'Profile',
};
type TabName = keyof typeof TAB_ICONS;

const TabBarIconDis = (name: TabName, isFocused: boolean) => {
  const IconComponent = TAB_ICONS[name];
  return (
    <IconComponent
      width={scale(20)}
      height={verticalScale(20)}
      color={isFocused ? '#9E79EB' : '#B5B4B4'}
    />
  );
};

const TabBarName = (name: TabName) => {
  return TAB_TITLES[name];
};

// eslint-disable-next-line react/prop-types
const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: 'absolute',
        height: verticalScale(50),
        width: '100%',
        paddingHorizontal: scale(15),
        bottom: insets.bottom + verticalScale(5),
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: {
          width: 1,
          height: 1,
        },
      }}>
      <View
        style={{
          flex: 1,
          borderRadius: moderateScale(15),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: scale(8),
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          // const label =
          //   options.tabBarLabel !== undefined
          //     ? options.tabBarLabel
          //     : options.title !== undefined
          //       ? options.title
          //       : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center' }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View>{TabBarIconDis(route.name as TabName, isFocused)}</View>
                <Text
                  style={{
                    color: isFocused ? '#9E79EB' : '#B5B4B4',
                    fontFamily: 'Poppins_400Regular',
                  }}>
                  {TabBarName(route.name as TabName)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default TabBar;
