import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'expo-image';
import Images from '@/constants/Images';
import { useFocusEffect } from 'expo-router';

type Props = {
  children: React.ReactNode;
};

const ScreenWrapper: React.FC<Props> = ({ children }) => {
  useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });

  return (
    <>
      <StatusBar />
      <ImageBackground
        source={Images.background}
        style={{ flex: 1, zIndex: 0 }}
        onError={(error) =>
          console.error('Failed to load background image:', error)
        }>
        <SafeAreaView className={'flex-1'}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={10}
            className="flex-1"
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback
            >
              <ScrollView
                contentContainerStyle={{ flexGrow : 1, }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag">
                {children}
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default ScreenWrapper;
