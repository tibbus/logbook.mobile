import React from 'react'
import {
  StyleSheet,
  View,
  ListView,
  Image
} from 'react-native'
import { FitImage }  from '../../Image'

export const getGalleryView = (galleryDataSource) => {
  return (
    <View>
        <ListView
        horizontal={true}
        style={{flex:1}}
        dataSource={galleryDataSource}
        scrollEnabled={false}
        renderRow={(data) => galleryContent(data)}
        />
    </View>
  )
}

const galleryContent = (data) => {
    
    if(data.type === "image") {
        return <FitImage key={data.uri} resizeMode={Image.resizeMode.contain} source={{uri: data.uri}} style={styles.postPhoto} />
    }
    
    if(data.type === "video") {
        return <ListVideo key={data.uri} paused={true} uri={data.uri} onVideoPress={() => { this.paused === true ? this.paused = false : this.paused = true}} />;
    }
}

const styles = StyleSheet.create({
    postPhoto: {
        height: 120,
        width: 120,
        borderRadius: 5,
        padding: 5,
        margin: 3
    },
})