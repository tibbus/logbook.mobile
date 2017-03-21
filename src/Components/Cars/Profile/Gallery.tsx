import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    ListView,
    ScrollView
} from 'react-native'
import { FitImage } from '../../Image'
import { ListVideo } from '../../Video/ListVideo';
import Icon from 'react-native-vector-icons/FontAwesome'

const galleryContent = (contentUri, type) => {

    if (type === "Image") {
        // @TODO Image.resizeMode.contain replaced with fixed
        return <FitImage key={contentUri} resizeMode={Image.resizeMode.contain} source={{ uri: contentUri }} style={styles.photo} />
    }

    if (type === "Video") {
        return <ListVideo key={contentUri} paused={true} uri={contentUri} onVideoPress={() => this.paused = false} />;
    }
}

const getContentUris = (post) => post.contentUris;

export class Gallery extends Component<any, any> {

    constructor(props) {
        super(props)
    }

    render() {

        const { carImages, carVideos } = this.props;

        var images = [];

        if (carImages.length !== 0) {
            images = carImages.map(getContentUris);
            images = [].concat.apply([], images);
        }

        var videos = [];

        if (carVideos.length !== 0) {
            videos = carVideos.map(getContentUris);
            videos = [].concat.apply([], videos);
        }

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            imageDataSource: ds.cloneWithRows(images),
            videoDataSource: ds.cloneWithRows(videos)
        };

        return (

            <ScrollView
                automaticallyAdjustContentInsets={false}
                style={styles.scrollView}>
                <View style={{ height: 300 }}>
                    <Text>Videos</Text>
                    <ScrollView
                        automaticallyAdjustContentInsets={false}
                        horizontal={true}
                        style={[styles.horizontalScrollView]}>
                        {
                            videos.map((video) => galleryContent(video, 'Video'))
                        }
                    </ScrollView>
                </View>
                <View style={{ height: 300 }}>
                    <Text>Photos</Text>
                    <ListView
                        dataSource={this.state.imageDataSource}
                        renderRow={(data) => !data ? <Text>No Images</Text> : galleryContent(data, 'Image')}
                        renderSeperator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                        enableEmptySections={true}
                        contentContainerStyle={styles.listImages}
                    />
                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({

    scrollView: {
        height: 300,
        //flex:1
    },
    photo: {
        height: 120,
        width: 120,
        borderRadius: 5,
        padding: 5,
        margin: 3
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    listImages: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    } as React.ViewStyle,
    horizontalScrollView: {
        height: 300,
    }
});