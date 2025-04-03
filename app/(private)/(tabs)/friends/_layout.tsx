import FriendHeader from '@/components/UI/Friends/FriendHeader';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="(section)"
        options={{
          header: () => <FriendHeader />,
          headerTransparent : true,
        }}
      />
    </Stack>
  );
};

export default Layout;
