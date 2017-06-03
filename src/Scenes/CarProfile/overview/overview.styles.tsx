import { StyleSheet } from 'react-native';

import palette from '../../../Styles/Themes/palette';
import background from '../../../Styles/Themes/background';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    height: 400,
    backgroundColor: background.color,
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5
  },
  headingFirstTitle: {
    flex: 1.5,
    flexDirection: 'row',
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    paddingLeft: 20
  },
  headingSecondTitle: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: '400',
    color: palette.inactive,
    paddingRight: 10
  },
  media: {
    height: 120,
    width: 120,
    //borderRadius: 5,
    padding: 5,
    margin: 3
  },
  video: {
    width: 150,
  }
});
