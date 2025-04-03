import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface Props {
    username: string;
    fullName: string;
    profilePic: string;
}

const SearchFriendCard: React.FC<Props> = ({ username, fullName, profilePic }) => {
    return (
        <View key={username} style={styles.cardContainer}>
            <View style={styles.rowContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: profilePic }}
                        style={styles.profileImage}
                        height={verticalScale(50)}
                        width={scale(50)}
                        resizeMethod="auto"
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.columnContainer}>
                        <View>
                            <Text numberOfLines={1} style={styles.fullNameText}>
                                {fullName}
                            </Text>
                        </View>
                        <View>
                            <Text numberOfLines={1} style={styles.usernameText}>
                                {username}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'rgba(30,21,41,0.3)',
        padding: moderateScale(10),
        marginVertical: verticalScale(4),
        marginHorizontal: scale(7),
        borderRadius: moderateScale(4),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 0.2,
    },
    profileImage: {
        borderRadius: moderateScale(5),
    },
    textContainer: {
        flex: 0.4,
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    fullNameText: {
        color: '#fff',
        fontFamily: 'Poppins_500Medium',
        fontSize: moderateScale(15),
        textAlign: 'center',
    },
    usernameText: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: '700',
        fontSize: moderateScale(9),
        textAlign: 'center',
        color: '#A3AFb8',
    },
});

export default SearchFriendCard;