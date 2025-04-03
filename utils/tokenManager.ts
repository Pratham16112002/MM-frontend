import SecureStorage from './storage';
import { APIError } from './Exception';
import { responseErrorHandler } from './responseHandler';
import axiosInstance from '@/api/axiosConfig';

interface Tokens {
  access_token: string;
  refresh_token: string;
}

class TokenManager {
  private static instance: TokenManager;
  private storage = SecureStorage.create<Tokens>('tokens');
  private constructor() {}
  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      return new TokenManager();
    }
    return TokenManager.instance;
  }
  async saveTokens(tokens: Tokens): Promise<void> {
    await this.storage.setValue(tokens);
  }
  async getAccessToken(): Promise<string | null> {
    const tokens = await this.storage.getValue();
    return tokens?.access_token || null;
  }
  async getRefreshToken(): Promise<string | null> {
    const tokens = await this.storage.getValue();
    return tokens?.refresh_token || null;
  }
  async generateNewAccessToken(): Promise<string> {
    const lc_refreshToken = await this.getRefreshToken();
    if (lc_refreshToken !== undefined) {
      try {
        const response = await axiosInstance.post('api/user/refresh-token', {
          refreshToken: lc_refreshToken,
        });
        const newTokens: Tokens = {
          access_token: response.data.data.token,
          refresh_token: response.data.data.refreshToken,
        };
        await this.saveTokens(newTokens);
        return newTokens.access_token;
      } catch (error: unknown) {
        const res_error = responseErrorHandler(error);
        throw new APIError(res_error.message, res_error.code);
      }
    } else {
      throw new Error('No refresh token was found on platform');
    }
  }
  async logout(): Promise<void> {
    await this.storage.removeValue();
  }
}

export default TokenManager;
