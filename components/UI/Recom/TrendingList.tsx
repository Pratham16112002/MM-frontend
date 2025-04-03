import React from "react";
import { FlatList, View, Text, Image, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const dummy_data = [
  {
    id: "1",
    title: "Venom: The Last Dance",
    year: 2024,
    genre: "Action/Sci-fi",
    duration: "1h 49m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/4/42/Venom_Let_There_Be_Carnage_poster.jpg",
    rating: 8.3,
    platforms: ["Disney+ Hotstar", "Prime Video", "Netflix"],
    votes: 1601,
  },
  {
    id: "2",
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Action/Sci-fi",
    duration: "3h 2m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    rating: 8.4,
    platforms: ["Disney+", "Prime Video"],
    votes: 20000,
  },
  {
    id: "3",
    title: "The Batman",
    year: 2022,
    genre: "Action/Crime",
    duration: "2h 56m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Batman_%282022_film%29_poster.jpg",
    rating: 7.9,
    platforms: ["HBO Max", "Prime Video"],
    votes: 8500,
  },
  {
    id: "4",
    title: "Spider-Man: No Way Home",
    year: 2021,
    genre: "Action/Adventure",
    duration: "2h 28m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    rating: 8.5,
    platforms: ["Netflix", "Disney+"],
    votes: 18000,
  },
  {
    id: "5",
    title: "Inception",
    year: 2010,
    genre: "Sci-fi/Thriller",
    duration: "2h 28m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
    rating: 8.8,
    platforms: ["Netflix", "Amazon Prime"],
    votes: 22000,
  },
  {
    id: "6",
    title: "Interstellar",
    year: 2014,
    genre: "Sci-fi/Drama",
    duration: "2h 49m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    rating: 8.6,
    platforms: ["HBO Max", "Disney+"],
    votes: 30000,
  },
  {
    id: "7",
    title: "Spider-Man: No Way Home",
    year: 2021,
    genre: "Action/Adventure",
    duration: "2h 28m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    rating: 8.5,
    platforms: ["Netflix", "Disney+"],
    votes: 18000,
  },
  {
    id: "8",
    title: "Dune: Part Two",
    year: 2024,
    genre: "Sci-fi/Adventure",
    duration: "2h 46m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/8/8b/Dune_Part_Two_poster.jpg",
    rating: 8.7,
    platforms: ["HBO Max", "Prime Video"],
    votes: 12000,
  },
  {
    id: "9",
    title: "Joker",
    year: 2019,
    genre: "Drama/Thriller",
    duration: "2h 2m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",
    rating: 8.4,
    platforms: ["Netflix", "Prime Video"],
    votes: 25000,
  },
  {
    id: "10",
    title: "Spider-Man: No Way Home",
    year: 2021,
    genre: "Action/Adventure",
    duration: "2h 28m",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    rating: 8.5,
    platforms: ["Netflix", "Disney+"],
    votes: 18000,
  },
];

const TrendingList: React.FC = () => {
  return (
    <FlatList
      data={dummy_data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.poster }}
            style={styles.image}
            resizeMethod="auto"
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.year} • {item.genre} • {item.duration}
            </Text>
            <View style={{
                flexDirection : 'row',
                alignItems : 'center',
                gap : scale(8)
            }}>
              <FontAwesome name="star" size={moderateScale(15)} color="white" />
              <Text style={styles.rating}>
                {item.rating} ({item.votes} votes)
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    marginVertical: verticalScale(2),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.3, // Transparency of shadow
    shadowRadius: 5, // Blur effect
    elevation: 5,
  },
  image: {
    aspectRatio: 1,
    width: scale(50),
    height: verticalScale(70),
    borderRadius: moderateScale(8),
  },
  textContainer: {
    marginLeft: scale(10),
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins_500Medium',
    color: 'white',
    fontSize: moderateScale(16),
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: moderateScale(12),
    marginVertical: verticalScale(2),
  },
  rating: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TrendingList;