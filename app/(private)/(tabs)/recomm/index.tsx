import AddRecomm from '@/components/UI/Recom/AddRecomm';
import Personalized from '@/components/UI/Recom/Personalized';
import TrendingRecomm from '@/components/UI/Recom/Trending';
import HomeScreenWrapper from '@/components/UI/Wrappers/HomeScreenWrapper';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RecommPage = () => {
  return (
    <HomeScreenWrapper>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 0.5,
            }}>
            <TrendingRecomm />
          </View>
          <View
            style={{
              flex: 0.5,
            }}>
            <View
              style={{
                flex: 0.5,
              }}>
              <Personalized />
            </View>
          </View>
          <AddRecomm />
        </View>
      </GestureHandlerRootView>
    </HomeScreenWrapper>
  );
}

export default RecommPage; 
