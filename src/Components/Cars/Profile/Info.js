import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


export const Info = ({ownerImage, ownerName}) => (

    <View style={styles.container}>
        <View style={styles.subContainer}>
            <Image source={{ uri: ownerImage}} style={styles.photo} />
            <Text style={styles.text}>{ownerName}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        padding: 12,
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
    },
    textHeading: {
        marginLeft: 12,
        fontSize: 16,
    },
    text: {
        marginLeft: 12,
        fontSize: 13,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});