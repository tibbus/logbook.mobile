import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  media: {
    borderWidth: 1,
    borderColor: 'white',
    height: 100,
    width: width / 3
  },
  video: {
    margin: 2,
    height: 120,
    width: 150
  },
  mediaText: {
    fontSize: 21,
    fontWeight: '600',
    margin: 20,
    marginTop: 25
  },
  photosText: {
    marginTop: 30
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  horizontalScrollView: {
    paddingHorizontal: 10,
    paddingRight: 100,
    flexDirection: 'row'
  }
});
