import React from 'react';
import TabBar from '@/components/UI/TabBar';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: true,
      }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen
        name="recomm"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          headerShown : false
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
