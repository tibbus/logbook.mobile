import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 6.5,
    marginHorizontal: 20
  },
  statContainer: {
    flexDirection: 'row'
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  stats: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 15
  },
  ownerName: {
    fontSize: 14,
    marginLeft: 7,
    fontWeight: '600'
  },
  textHeading: {
    marginLeft: 12,
    fontSize: 16,
  },
  text: {
    marginLeft: 12,
    fontSize: 13,
  },
  photo: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  verifyWrapper: {
    alignItems: 'center',
    backgroundColor: '#FAC112',
    padding: 5,
    marginTop: 10,
    borderRadius: 2,
    width: 162
  },
  verifyText: {
    fontSize: 12,
    fontWeight: '600'
  }
});
