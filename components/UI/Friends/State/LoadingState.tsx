import { verticalScale } from 'react-native-size-matters';
import HomeScreenWrapper from '../../Wrappers/HomeScreenWrapper';
import { View, ActivityIndicator } from 'react-native';

const LoadingState = () => {
  return (
    <HomeScreenWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: verticalScale(20),
        }}>
        <ActivityIndicator
          style={{ marginTop: verticalScale(20) }}
          size="large"
          color={'white'}
        />
      </View>
    </HomeScreenWrapper>
  );
};

export default LoadingState;
