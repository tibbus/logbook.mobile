import { StyleSheet } from 'react-native';

import palette from '../../Styles/Themes/palette';
import background from '../../Styles/Themes/background';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.carProfile
  } as React.ViewStyle,
  underline: {
    backgroundColor: palette.primary,
    height: 3,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '700'
  },
  infoWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  imageWrapper: {
    flex: 3.5
  },
  carModelWrapper: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 0
  },
  carName: {
    fontSize: 23,
    fontWeight: '700'
  },
  carYear: {
    color: '#D0D0D0'
  }
});
