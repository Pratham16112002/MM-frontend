import React from 'react';
import {  router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { SessionProvider, useAuth } from '@/context/ctx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import {
  OpenSans_700Bold
} from '@expo-google-fonts/open-sans'
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
  
} from '@expo-google-fonts/poppins';
import { OnboardProvider, useOnboardScreen } from '@/context/obCtx';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(2000 * 2 ** attemptIndex, 30000),
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  const [loaded, error] = useFonts({
    OpenSans_700Bold,
    Poppins_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Roboto_500Medium,
    Inter_400Regular,
  });
  

  useEffect(() => {
    if (loaded || error ) {
      SplashScreen.hideAsync();
    }
    
  }, [loaded, error]);

  if (!loaded && !error ) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <OnboardProvider>
        <SessionProvider>
          <RootLayoutNav />
        </SessionProvider>
      </OnboardProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
const { loading } = useOnboardScreen();
  const {sessionLoading} = useAuth();
  React.useEffect(() => {
    if(!loading && !sessionLoading){
      SplashScreen.hideAsync();
    }
  })
  if(loading || sessionLoading){
    return null
  }
  return <RootLayoutNav2 />;
}

 
function RootLayoutNav2() {
const {  onboarded } = useOnboardScreen();
  const { authState} = useAuth();
  React.useEffect(() => {
    function navigateUser() {
      if(!onboarded){
        router.replace('/onboarding')
        return;
    }
    if(!authState.authenticated){
      router.replace('/(auth)/login')
      return;
    }
    router.replace('/(private)/movie/2333')
  }
    navigateUser();
    return () => {}; 
    
  },[authState, onboarded])
  
  return (
    <Stack>
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(private)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
  
}

