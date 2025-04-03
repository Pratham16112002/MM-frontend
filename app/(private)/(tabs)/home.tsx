import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Carousal from '@/components/UI/Carousal/Carousal';
import Genre from '@/components/UI/HomeScreen/Cards/Genre';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import HomeScreenWrapper from '@/components/UI/Wrappers/HomeScreenWrapper';
import { Stack } from 'expo-router';
import HomeHeader from '@/components/UI/HomeScreen/HomeHeader';

export default function TabOneScreen() {
  const animatedHeight = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      animatedHeight.value = event.contentOffset.y;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <HomeHeader animatedValue={animatedHeight} />,
          headerTransparent: true,
        }}
      />

      <HomeScreenWrapper>
        <Animated.ScrollView
          className="flex-1"
          onScroll={scrollHandler}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: verticalScale(110),
          }}>
          <View
            style={styles.screenWrapper}
            className="flex-1 justify-center items-center">
            {/* Popular Movies section */}
            <View style={styles.PopularPanelWrapper}>
              <View className="items-center">
                <Text style={styles.PopularPanelTitle}>
                  World-wide popular movies
                </Text>
              </View>
              <View style={{ width: scale(400), alignItems: 'center' }}>
                <Carousal />
              </View>
            </View>

            {/* Top Rated Shows */}
            <View style={styles.PopularPanelWrapper1}>
              <View style={styles.TitleWrapper}>
                <Text style={styles.PopularPanelTitle1}>Top Rated Shows</Text>
              </View>
              <View style={styles.PopularMoviesPanel}>
                <Genre type="tvSeries" />
              </View>
            </View>
            <View style={styles.PopularPanelWrapper1}>
              <View style={styles.TitleWrapper}>
                <Text style={styles.PopularPanelTitle1}>Top Rated Movies</Text>
              </View>
              <View style={styles.PopularMoviesPanel}>
                <Genre type="movie" />
              </View>
            </View>

            {/* Movies to Watch in Theatre */}
            <View style={styles.PopularPanelWrapper1}>
              <View style={styles.TitleWrapper}>
                <Text style={styles.PopularPanelTitle1}>
                  Movies to watch in theatre
                </Text>
              </View>
              <View style={styles.PopularMoviesPanel}>
                <Genre type="movie" />
              </View>
            </View>
          </View>
        </Animated.ScrollView>
      </HomeScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    padding: moderateScale(5),
  },
  PopularPanelTitle: {
    fontSize: moderateScale(15),
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
  },
  PopularPanelWrapper: {
    gap: verticalScale(10),
  },
  PopularPanelTitle1: {
    fontSize: moderateScale(18),
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
  },
  PopularPanelWrapper1: {
    marginTop: verticalScale(20),
    gap: verticalScale(5),
  },
  PopularMoviesPanel: {
    height: verticalScale(120),
  },
  TitleWrapper: {
    alignItems: 'flex-start',
    paddingLeft: scale(7),
  },
  errorImage: {
    width: scale(200),
    height: verticalScale(100),
  },
  errorText: {
    color: 'white',
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
});
