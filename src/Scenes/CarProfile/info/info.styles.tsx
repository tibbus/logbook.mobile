import { StyleSheet } from 'react-native';

import palette from '../../../Styles/Themes/palette';

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
  buttonContainer: {
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    borderRadius: 2,
    width: 162
  },
  verifyContainer: {
    backgroundColor: '#FAC112',
  },
  followContainer: {
    borderColor: palette.primary,
    borderWidth: 1,
  },
  unfollowContainer: {
    borderColor: '#787878',
    borderWidth: 1,
  },
  followText: {
    color: palette.primary,
    fontWeight: '400'
  },
  unfollowText: {
    color: '#787878',
    fontWeight: '400'
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600'
  }
});
