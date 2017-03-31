import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native'
import {capitalize} from 'underscore.string'
import palette from '../../../Themes/palette';

export const getTagsView = (tagsDataSource) => {
  return (
    <View style={styles.tagsContainer}>
        <Text style={styles.tagsText}>Tags</Text>
        <ListView
        horizontal={true}
        style={{flex:1}}
        dataSource={tagsDataSource}
        scrollEnabled={false}
        renderRow={(rowData) => <Text style={styles.tagsRow}>{capitalize(rowData, true)}</Text>}/>
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
  tagsText: {
    fontSize: 15,
    color: palette.inactive,
    marginRight: 15,
  },
  tagsRow: {
    paddingHorizontal: 10, 
    paddingVertical: 5,
    borderWidth: 1, 
    borderColor: palette.border,
    margin: 5,
    fontSize: 15,
  }
})