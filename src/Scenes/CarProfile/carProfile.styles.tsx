import { StyleSheet } from 'react-native';

import palette from '../../Styles/Themes/palette';
import background from '../../Styles/Themes/background';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  underline: {
    backgroundColor: palette.primary,
    height: 3,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '700'
  },
  infoWrapper: {
    backgroundColor: background.carProfile
  },
  subWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  imageWrapper: {
    flex: 3.5
  },
  carModelWrapper: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 0
  },
  carName: {
    fontSize: 23,
    fontWeight: '700'
  },
  carModel: {
    flexShrink: 1
  },
  carYear: {
    color: '#D0D0D0',
    minWidth: 75
  }
});
