import { GenreListDataType } from '@/app/(private)/list';
import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

// import { Container } from './styles';

type Props = {
  data: GenreListDataType;
};

const GenreListItem: React.FC<Props> = ({ data }) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  return (
    <TouchableOpacity
    onPress={() => {
      router.push(`/(private)/movie/${data.id}`)
    }}
      style={styles.cardWrapper}>
      <View
        style={{
          flex: 1,
        }}>
        <ImageBackground
          source={{ uri: data.primaryImage }}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          style={{
            flex : 1,
          }}
          alt={data.primaryTitle}
          resizeMode="cover"
          resizeMethod="auto">
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color="white" size="small" />
            </View>
          )}
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper : {
      width : scale(90),
        height : verticalScale(110),
        marginRight: scale(15),
        borderRadius: moderateScale(10),
        overflow: 'hidden',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        backgroundColor: '#181522',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#25134b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GenreListItem;
