import React, {
  TouchableOpacity,
  View
} from 'react-native'
import { Comment, CommentInputButton } from './'

const last = (items = []) => items.length ? [items[0]] : items

export const CommentsSnapshot = ({
  comments, limit, onPress, style
}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <View>
      {last(comments).map((comment, i) => <Comment key={i} {...comment} />)}
    </View>
  </TouchableOpacity>
)

export const Comments = ({
  comments, limit, onPress
}) => (
  <View>
    {comments.map((comment, i) => <Comment key={i} {...comment} />)}
    <CommentInputButton onPress={onPress} />
  </View>
)
