import React, { createContext, PropsWithChildren, useEffect, useState, useContext } from 'react';
import TokenManager from '@/utils/tokenManager';
import { router } from 'expo-router';
import { Platform } from 'react-native';

export const TOKEN_KEY = 'access';

interface SignInTokens {
  accessToken: string;
  refreshToken: string;
}

export const AuthContext = createContext<{
  signIn: (tokens: SignInTokens) => Promise<void>;
  signOut: () => Promise<void>;
  authState: {
    authenticated: boolean;
  };
  sessionLoading: boolean;
}>({
  signIn: async () => {},
  signOut: async () => {},
  authState: {
    authenticated: false,
  },
  sessionLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function SessionProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<{ authenticated: boolean }>({
    authenticated: false,
  });

  const [sessionLoading, setSessionLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadToken() {
      setSessionLoading(true);
      try {
        let token;
        if (Platform.OS === 'web') {
          token = localStorage.getItem(TOKEN_KEY);
        } else {
          token = await TokenManager.getInstance().getAccessToken();
        }
        setAuthState({ authenticated: !!token });
      } catch (error) {
        console.error('Error fetching token:', error);
      } finally {
        setSessionLoading(false);
      }
    }
    loadToken();
  }, []);

  const signIn = async (payload: SignInTokens) => {
      await TokenManager.getInstance().saveTokens({
        access_token: payload.accessToken,
        refresh_token: payload.refreshToken,
      });
    setAuthState({ authenticated: true });
  };

  const signOut = async () => {
      await TokenManager.getInstance().logout();
    setAuthState({ authenticated: false });
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, authState, sessionLoading }}>
      {children}
    </AuthContext.Provider>
  );
}