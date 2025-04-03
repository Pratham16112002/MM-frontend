import * as SecureStore from 'expo-secure-store';

class SecureStorage<T> {
  private key: string;
  private constructor(key: string) {
    this.key = key;
  }
  static create<T>(key: string): SecureStorage<T> {
    return new SecureStorage<T>(key);
  }
  async setValue(value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(this.key, jsonValue);
  }
  async getValue(): Promise<T | null> {
    const StringifiedValue = await SecureStore.getItemAsync(this.key);
    return StringifiedValue ? JSON.parse(StringifiedValue) : null;
  }
  async removeValue(): Promise<void> {
    await SecureStore.deleteItemAsync(this.key);
  }
}

export default SecureStorage;
