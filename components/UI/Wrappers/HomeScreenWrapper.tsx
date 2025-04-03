import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const HomeScreenWrapper: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
       colors={[
        'rgba(55, 63, 70, 1)',  // Top
        'rgba(57, 75, 86, 1)',
        'rgba(56, 85, 104, 1)',
        'rgba(53, 79, 96, 1)',
        'rgba(50, 61, 72, 1)',
        'rgba(46, 44, 50, 1)'   // Bottom
      ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          flex: 1,
        }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={10}
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {children}
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
};

export default HomeScreenWrapper;
