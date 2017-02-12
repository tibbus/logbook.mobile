import React from 'react'
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import { Comment } from './'

const getViewForMultipleComments = (comments) => {
  const slicedArray = comments.slice(-2);
  return (
    <View>
        <View style={{height: 40, alignItems: 'center', paddingVertical: 10, backgroundColor: '#f5f5f5'}}>
          <Text>View all {comments.length} Comments.</Text>
        </View>
        <View>
          {
              slicedArray.map((comment, i) => <Comment key={i} {...comment} />)
          }
        </View>
    </View>
  )
}

const getDefaultViewForComments = (comments) => {
  return (
    <View>
      {
        comments.map((comment, i) => <Comment key={i} {...comment} />)
      }
    </View>
  )
}

export const Comments = ({
  comments
}) => {
  if(comments.length > 2) {
    return getViewForMultipleComments(comments)
  }
  else {
    return getDefaultViewForComments(comments)
  }
}
