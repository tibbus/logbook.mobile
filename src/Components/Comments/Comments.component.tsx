import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { Comment } from './Comment.component';
import background from '../../Styles/Themes/background';
import palette from '../../Styles/Themes/palette';

const styles = StyleSheet.create({
  comments: {
    marginTop: 10
  },
  viewCommentsWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: background.carProfile,
  },
  viewComments: {
    color: palette.date,
    fontWeight: '600',
    fontSize: 12
  }
});


const getViewForMultipleComments = (comments) => {
  //const slicedArray = comments.slice(-2);
  return (
    <View>
      <View style={styles.viewCommentsWrapper}>
        <Text style={styles.viewComments}>{comments.length} Comments</Text>
      </View>
      <View style={styles.comments}>
        {
          comments.map((comment, i) => <Comment key={i} {...comment} />)
        }
      </View>
    </View>
  );
}

const getDefaultViewForComments = (comments) => {
  return (
    <View>
      {
        comments.map((comment, i) => <Comment key={i} {...comment} />)
      }
    </View>
  );
}

export const Comments = ({
  comments
}) => {
  if (comments.length > 2) {
    return getViewForMultipleComments(comments)
  }
  else {
    return getDefaultViewForComments(comments)
  }
}
