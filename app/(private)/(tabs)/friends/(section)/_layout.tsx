import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import TopTabBar from '@/components/UI/Friends/TopTabBar';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => (
  <MaterialTopTabs tabBar={(props) => <TopTabBar {...props} />}>

    <MaterialTopTabs.Screen
      name="requests"
      options={{  title: 'Requests', tabBarLabel: 'Requests' }}
    />
    <MaterialTopTabs.Screen
      name="followers"
      options={{ tabBarLabel: 'Followers' }}
    />
    <MaterialTopTabs.Screen
      name="following"
      options={{
        tabBarLabel: 'Following',
      }}
    />
  </MaterialTopTabs>
);

export default Layout;
