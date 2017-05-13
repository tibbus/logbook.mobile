import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
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
    height: 200,
    flexDirection: 'row'
  }
});
