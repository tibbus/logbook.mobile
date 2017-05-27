import { StyleSheet, TextStyle } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    margin: 20,
    fontSize: 25,
    fontWeight: '600'
  } as TextStyle,
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5
  },
  category: {
    fontSize: 15,
    color: '#C7C5C5',
    fontWeight: '600',
    width: 130
  },
  value: {
    fontSize: 15
  },
  last: {
    marginBottom: 20
  }
});