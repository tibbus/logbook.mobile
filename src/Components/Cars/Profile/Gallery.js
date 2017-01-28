import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    ListView
} from 'react-native'
import FitImage from '../../Image'
import Icon from 'react-native-vector-icons/FontAwesome'

const galleryImage = (imageUri) => <Image source={{ uri: imageUri}} style={styles.photo} />;

const getImageUris = (post) => {
    return post.imageUris;
} 

export class Gallery extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        const { carImages } = this.props;
        var images = [];
        if(carImages.length !== 0){
            images = carImages.posts.map(getImageUris);
            images = [].concat.apply([], images);
        }
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(images)
        };

        return (
            <View style={styles.containerEmpty}>
                <Text style={styles.textHeading}>Gallery</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data) => !data ? <Text>No Images</Text> : galleryImage(data.toString())}
                    renderSeperator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    enableEmptySections={true}
                    contentContainerStyle={styles.list}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerEmpty: {
      flex: 1,
    },
    container: {
        flex: 1,
        padding: 12,
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
        height: 120,
        width: 120,
        borderRadius: 5,
        padding: 5,
        margin: 3
    },
    scrollView: {
        backgroundColor: '#6A85B1',
        flex: 1,
    },
    horizontalScrollView: {
        height: 200,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});