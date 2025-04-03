import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const WELCOME = 'onboard';

export const OnBoardScreenContext = createContext<{
  onboarded: boolean;
  onboard: () => Promise<void>;
  loading: boolean;
}>({
  onboarded: false,
  onboard: async () => {},
  loading: true,
});

export const useOnboardScreen = () => useContext(OnBoardScreenContext);

export function OnboardProvider({ children }: PropsWithChildren) {
  const [onboarded, setOnboarded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStatus() {
      setLoading(true);
      try {
          const value = await SecureStore.getItemAsync(WELCOME);
        setOnboarded(!!value);
      } catch (error) {
        console.error('Error loading onboarding status:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStatus();
  }, []);

  const onboard = async () => {
    try {
      setLoading(true);
        await SecureStore.setItemAsync(WELCOME, 'true');
      setOnboarded(true);
    } catch (error) {
      console.error('Failed to set onboarding status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnBoardScreenContext.Provider value={{ onboarded, onboard, loading }}>
      {children}
    </OnBoardScreenContext.Provider>
  );
}