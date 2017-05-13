import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  } as React.ViewStyle,
  underline: {
    backgroundColor: 'green',
    height: 0,
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
    padding: 20
  },
  carName: {
    fontSize: 23,
    fontWeight: '700'
  },
  carYear: {
    color: '#D0D0D0'
  }
});
