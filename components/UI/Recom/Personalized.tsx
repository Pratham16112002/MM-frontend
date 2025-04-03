import React from 'react';
import { View ,Text} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import PersonalizedPickList from './PersonalizedPickList';


const Personalized: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          gap: verticalScale(10),
          marginTop: verticalScale(10),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: moderateScale(25),
            color: 'white',
          }}>
          Personalized Picks
        </Text>
      <View
        style={{
          flex: 1,
          flexDirection : 'row'
        }}>
          </View>
        <PersonalizedPickList />
      </View>
    </View>
  );
}

export default Personalized;