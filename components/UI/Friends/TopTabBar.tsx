/* eslint-disable react/prop-types */
import { TouchableOpacity, View, Text } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

// eslint-disable-next-line react/prop-types
const TopTabBar: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View
      style={{
        position: 'absolute', 
        top: verticalScale(100), 
        left: 0,
        right: 0,
        zIndex: 100, 
        height: verticalScale(50),
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

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
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingBottom: verticalScale(4),
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: isFocused ? '#fff' : '#979A9E',
                      fontFamily: 'Poppins_600SemiBold',
                      fontSize: moderateScale(18),
                    }}>
                    {label.toString()}
                  </Text>
                </View>
                <View
                  style={{
                    height: verticalScale(2),
                    backgroundColor: isFocused ? '#fff' : '#979A9E',
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default TopTabBar;
