import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Images from '@/constants/Images';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { MovieSearchType } from '@/app/(private)/search';
import NumVotesSVGComponent from '../SVG/Icons/NumVotesSVGIcon';
import AverageRatingSVGComponent from '../SVG/Icons/RatingSVGIcon';

const MovieCard = ({ item }: { item: MovieSearchType }) => {
  return (
    <View
      style={{
        flex: 1,
        marginVertical: verticalScale(35),
        justifyContent: 'center',
      }}>
      <View style={styles.cardImage}>
        <Image
          source={{ uri: item.primaryImage ?? Images.error }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          resizeMethod="auto"
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.primaryTitle}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: scale(15),
            gap: scale(10),
          }}>
          <View
            style={{
              flex: 0.3,
              alignItems: 'flex-end',
            }}>
            <Text
              numberOfLines={1}
              style={styles.detailTextStyle}>
              2024
            </Text>
          </View>
          {Array.isArray(item.genres) && item.genres.length > 0 && (
            <View
              style={{
                flex: 0.5,
                overflow: 'hidden',
                alignItems: 'center',
              }}>
              <Text style={styles.cardGenreTitle} numberOfLines={1}>
                {item.genres.length > 0 && item.genres.join('/')}
              </Text>
            </View>
          )}
          <View
            style={{
              flex: 0.2,
              alignItems: 'flex-start',
            }}>
            <Text
              numberOfLines={1}
              style={styles.detailTextStyle}>
              1h 20m
            </Text>
          </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <NumVotesSVGComponent />
            <Text style={styles.detailText}>20</Text>
          </View>
          <View style={styles.detailItem}>
            <AverageRatingSVGComponent/> 
            <Text style={styles.detailText}>7.5</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  listContent: {
    paddingTop: verticalScale(120),
    paddingHorizontal: scale(10),
    gap: verticalScale(6),
  },
  cardImage: {
    overflow: 'hidden',
    position: 'absolute',
    transform: [
      {
        translateY: -verticalScale(30),
      },
    ],
    left: scale(8),
    top: verticalScale(8),
    width: scale(130),
    height: verticalScale(190),
    borderRadius: scale(8),
    zIndex: 20,
  },
  cardContent: {
    paddingVertical: verticalScale(15),
    flex: 1,
    flexDirection: 'column',
    marginVertical: verticalScale(20),
    marginRight: scale(8),
    marginLeft: scale(120),
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
    justifyContent: 'center',
    borderTopRightRadius: moderateScale(12),
    borderBottomRightRadius: moderateScale(12),
  },
  cardTitle: {
    marginLeft : scale(22),
    flex: 1,
    textAlign: 'center',
    color: 'white',
    opacity: 0.7,
    fontFamily: 'Poppins_500Medium',
    fontSize: moderateScale(20),
  },
  cardGenreTitle: {
    maxWidth: scale(80),
    flex: 1,
    opacity: 0.7,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: moderateScale(8, 2),
  },
  detailTextStyle: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: moderateScale(8, 2),
    opacity : 0.7,
  },
  cardDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    gap: scale(20),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(2),
  },
  detailText: {
    color: 'white',
    opacity: 0.7,
    fontFamily: 'Poppins_400Regular',
    fontSize: moderateScale(13),
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(120),
  },
  placeholderText: {
    color: 'white',
    fontSize: moderateScale(16),
    opacity: 0.7,
  },
});
