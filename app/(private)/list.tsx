import HomeScreenWrapper from '@/components/UI/Wrappers/HomeScreenWrapper';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { Text, StyleSheet } from 'react-native';
import ListHeader from '@/components/UI/ListScreen/ListHeader';
import ListHorizontalItems from '@/components/UI/List/HorizontalListItems';
import { scale, verticalScale } from 'react-native-size-matters';
import { useHeaderHeight } from '@react-navigation/elements';

export type GenreListDataType = {
  id: string;
  url: string;
  primaryTitle: string;
  primaryImage: string;
};

export const LANGUAGES = [
  { code: 'hi', language: 'Hindi' },
  { code: 'en', language: 'English' },
  { code: 'ka', language: 'Korean' },
  { code: 'ja', language: 'Japanese' },
  { code: 'fr', language: 'French' },
];

export default function List() {
  const { type, genres } = useLocalSearchParams();
  const [loadmore, setLoadmore] = React.useState<boolean>(true);
  // Scroll Animation
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Control the number of languages loaded
  const [visibleLanguages, setVisibleLanguages] = useState(
    LANGUAGES.slice(0, 3),
  );

  const loadMoreLanguages = () => {
    if (visibleLanguages.length == LANGUAGES.length) {
      Alert.alert('No more languages are available');
      setLoadmore(false);
      return;
    }
    if (visibleLanguages.length < LANGUAGES.length) {
      setVisibleLanguages((prev) => [
        ...prev,
        ...LANGUAGES.slice(prev.length, prev.length + 2), // Load 2 more languages
      ]);
    }
  };
  const headerHeight = useHeaderHeight();
  return (
    <View style={{ flex: 1 }}>
      {/* Animated Header */}
      <Stack.Screen
        options={{
          header: () => (
            <ListHeader
              genres={genres.toString()}
              type={type.toString()}
              animatedValue={scrollY}
            />
          ),
          headerTransparent: true,
        }}
      />

      <HomeScreenWrapper>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Animated FlatList */}
          <Animated.FlatList
            data={visibleLanguages}
            onScroll={scrollHandler}
            contentContainerStyle={{
              paddingTop:
                verticalScale(headerHeight) +
                (Platform.OS === 'ios' ? verticalScale(85) : verticalScale(40)),
              marginHorizontal: scale(8),
            }}
            keyExtractor={(_, index) => `language-${index}`}
            renderItem={({ item }) => (
              <ListHorizontalItems
                language={item}
                type={type.toString()}
                genres={genres.toString()}
              />
            )}
            ListFooterComponent={() => (
              <TouchableOpacity
                onPress={loadMoreLanguages}
                style={{
                  display: loadmore ? 'flex' : 'none',
                }}>
                <Text style={styles.loadMoreText} numberOfLines={1}>
                  Load more
                </Text>
              </TouchableOpacity>
            )}
            ListFooterComponentStyle={{
              alignItems: 'center',
              marginVertical: verticalScale(8),
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </HomeScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  loadMoreText: {
    color: '#00A6ED',
    textDecorationLine: 'underline',
  },
});
