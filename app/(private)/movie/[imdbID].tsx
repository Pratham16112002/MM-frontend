import Images from '@/constants/Images';
import React from 'react';
import { Text, ImageBackground, SafeAreaView, ScrollView, View, Pressable } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AntDesign from '@expo/vector-icons/AntDesign';
import NumVotesSVGComponent from '@/components/UI/SVG/Icons/NumVotesSVGIcon';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const movieData = {
  title: "Eternals",
  year: 2021,
  genres: ["Action", "Adventure", "Fantasy"],
  duration: "2h 36m",
  ratings: {
    critic: 7.3,
    audience: 8.0,
    votes: 1601,
  },
  description:
    "The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations.",
  recommendedBy: [
    {
      id: 1,
      name: "Angelina Jolie",
      image: "https://example.com/angelina.jpg",
    },
    {
      id: 2,
      name: "Gemma Chan",
      image: "https://example.com/gemma.jpg",
    },
    {
      id: 3,
      name: "Salma Hayek",
      image: "https://example.com/salma.jpg",
    },
  ],
  cast: [
    {
      id: 1,
      name: "Richard Madden",
      image: "https://example.com/richard.jpg",
    },
    {
      id: 2,
      name: "Gemma Chan",
      image: "https://example.com/gemma.jpg",
    },
    {
      id: 3,
      name: "Angelina Jolie",
      image: "https://example.com/angelina.jpg",
    },
  ],
  availableOn: [
    {
      id: 1,
      name: "Disney+",
      logo: "https://example.com/disney_logo.png",
    },
    {
      id: 2,
      name: "Prime Video",
      logo: "https://example.com/prime_logo.png",
    },
  ],
};

const movie: React.FC = () => {
//   const {imdbID } = useLocalSearchParams();
const insets = useSafeAreaInsets()

  return (
    <ImageBackground
      source={{
        uri : 'https://i.redd.it/bs73ztbaqvfd1.jpeg'
      }}
      style={{
        flex: 1,
      }}>
        <View style={{
          flex : 1,
          backgroundColor : 'rgba(0,0,0,0.7)'
        }}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
          <Pressable onPress={() => router.back()}>
          <View style={{
            position : 'absolute',
            top : verticalScale(10) + insets.top,
            left : scale(20)
          }}>
           <Ionicons name="chevron-back" size={moderateScale(34)} color="white" />
          </View>
          </Pressable>
        <ScrollView>

          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                paddingTop: verticalScale(100),
                flex: 0.4,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: verticalScale(10),
                }}>
                <Text
                  style={{
                    fontFamily: 'OpenSans_700Bold',
                    fontSize: moderateScale(30),
                    color: 'white',
                    opacity: 0.75,
                  }}>
                  Eternals
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: verticalScale(20),
                }}>
                <View
                  style={{
                    flex: 0.2,
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: moderateScale(18),
                      color: 'white',
                      opacity: 0.75,
                    }}>
                    2021
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.6,
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: moderateScale(15),
                      color: 'white',
                      opacity: 0.75,
                      overflow: 'hidden',
                    }}>
                    Action-Adventure-Fantasy
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.2,
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: moderateScale(18),
                      color: 'white',
                      opacity: 0.75,
                    }}>
                    2h 36m
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: verticalScale(20),
                  gap: scale(4),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: scale(8),
                  }}>
                  <Foundation
                    name="star"
                    size={moderateScale(24)}
                    color="white"
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: moderateScale(13),
                      color: 'white',
                      opacity: 0.75,
                      marginTop: verticalScale(2),
                    }}>
                    7.3/10
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.75,
                    width: scale(1),
                    marginHorizontal: scale(8),
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: scale(8),
                  }}>
                  <AntDesign
                    name="like1"
                    size={moderateScale(24)}
                    color="white"
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: moderateScale(13),
                      color: 'white',
                      opacity: 0.75,
                      marginTop: verticalScale(5),
                    }}>
                    8.3/10
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.75,
                    width: scale(1),
                    marginHorizontal: scale(8),
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    gap: scale(8),
                    paddingTop: verticalScale(4),
                  }}>
                  <NumVotesSVGComponent
                    height={verticalScale(25)}
                    width={scale(25)}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter_400Regular',
                      fontSize: moderateScale(13),
                      color: 'white',
                      opacity: 0.75,
                      marginTop: verticalScale(7),
                    }}>
                    2400
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter_400Regular',
                    fontSize: moderateScale(17),
                    color: 'white',
                    opacity: 0.75,
                    marginHorizontal : scale(20),
                    textAlign :'center'
                  }}>
                  The saga of the Eternals, a race of immortal beings who lived
                  on Earth and shaped its history and civilizations.
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.6,
              }}>
              {/* Recommendations and Cast information */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
        </View>
    </ImageBackground>
  );

}

export default movie;