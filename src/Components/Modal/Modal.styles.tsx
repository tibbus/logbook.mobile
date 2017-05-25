import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  contentContainer: {
    flex: 1
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
    paddingLeft: 15
  },
  closeIcon: {
    color: 'white',
    fontSize: 35
  }
})
