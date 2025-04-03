import GoUpButton from '@/components/UI/Button/GoUpButton';
import FriendSearchHeader from '@/components/UI/Friends/FriendSearchHeader';
import FriendSearchList from '@/components/UI/Friends/Search/FriendList';
import HomeScreenWrapper from '@/components/UI/Wrappers/HomeScreenWrapper';
import { useDebounce } from '@/hooks/ui/useDebounce';
import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export type FriendSearchType = {
  username: string;
  fullName: string;
  profilePic: string;
};

const SearchFriends: React.FC = () => {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  const friendListRef = React.useRef<{scrollUp : () => void} | null>(null) 
  const [search, searchTerm] = React.useState<string>('');
  const debouncedSearch = useDebounce(search);

  const setSearchQuery = (text: string) => {
    searchTerm(text);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <FriendSearchHeader
              animatedValue={scrollY}
              onChange={setSearchQuery}
            />
          ),
          headerTransparent: true,
        }}
      />
      <HomeScreenWrapper>
        <SafeAreaView style={styles.safeAreaContainer}>
          <FriendSearchList
            ref={friendListRef}
            onListScroll={scrollHandler}
            searchTerm={debouncedSearch}
          />
          <GoUpButton sharedValue={scrollY} onClick={() => friendListRef.current?.scrollUp()} />
        </SafeAreaView>
      </HomeScreenWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  safeAreaContainer: {
    flex: 1,
  },
});

export default SearchFriends;
