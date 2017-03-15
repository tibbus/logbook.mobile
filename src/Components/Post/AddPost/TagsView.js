import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native'

export const getTagsView = (tagsDataSource) => {
  return (
    <View style={styles.tagsContainer}>
        <Text>Tags</Text>
        <ListView
        horizontal={true}
        style={{flex:1}}
        dataSource={tagsDataSource}
        scrollEnabled={false}
        renderRow={(rowData) => <Text style={styles.tagsRow}>{rowData}</Text>}/>
    </View>
  )
}

const styles = StyleSheet.create({
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagsRow: {
    paddingHorizontal: 5, 
    borderWidth: 1, 
    margin: 5
  }
})