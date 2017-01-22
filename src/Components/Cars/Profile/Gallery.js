import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView
} from 'react-native'
import FitImage from '../../Image'
import Icon from 'react-native-vector-icons/FontAwesome'

const galleryImage = (imageUri) => <FitImage key={imageUri} resizeMode={Image.resizeMode.contain} source={{imageUri}} style={styles.photo} />;

export const Gallery = ({images}) => (

    <View style={styles.container}>
        <Text style={styles.textHeading}>Gallery</Text>
        <ScrollView 
            automaticallyAdjustContentInsets={false}
            horizontal={true}
            style={[styles.scrollView, styles.horizontalScrollView]}>
            {images.map(galleryImage)}
        </ScrollView>   
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
        flexDirection:'row',
        padding: 12,
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
        height: 60,
        width: 60,
        borderRadius: 5,
    },
    scrollView: {
        backgroundColor: '#6A85B1',
        flex: 1,
    },
    horizontalScrollView: {
        height: 200,
    }
});