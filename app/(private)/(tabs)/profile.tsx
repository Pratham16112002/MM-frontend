import CustomButton from '@/components/CustomButton';
import { useAuth } from '@/context/ctx';
import { Text, View } from 'react-native';

export default function TabFourScreen() {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Tab Four Screen</Text>
      <CustomButton title="Logout" onPress={signOut} />
    </View>
  );
}
