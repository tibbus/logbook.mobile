import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView
} from 'react-native';
import { capitalize } from 'underscore.string';

import { TagsBox } from '../../Components/Tags/index';
import palette from '../../Styles/Themes/palette';
import screen from '../../Styles/Themes/screen';

export const getTagsView = (tagsDataSource) => {
  return (
    <View style={styles.tagsContainer}>
      <Text style={styles.tagsHeader}>Tags:</Text>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        style={[styles.scrollView, styles.horizontalScrollView]}>
        {
          <ListView
            horizontal={true}
            style={{ flex: 1 }}
            dataSource={tagsDataSource}
            scrollEnabled={false}
            renderRow={TagsBox} />
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  tagsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    paddingLeft: screen.paddingHorizontal,
    borderTopWidth: screen.componentBorderWidth,
    borderBottomWidth: screen.componentBorderWidth,
    borderColor: palette.border,
  },
  tagsHeader: {
    fontSize: 15,
    color: palette.inactive,
    marginRight: 15,
    // paddingBottom: 10,
  },
  scrollView: {
    flex: 0.5,
  },
  horizontalScrollView: {
    // paddingBottom: 10,
  },
})