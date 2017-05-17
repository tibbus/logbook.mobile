import { StyleSheet } from 'react-native';

import background from '../../Styles/Themes/background';

export const styles = StyleSheet.create({
  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carPhoto: {
    height: 20,
    width: 20,
    borderRadius: 10
  },
  description: {
    fontSize: 20,
    padding: 20,
    paddingTop: 10
  },
  carName: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 10,
    flex: 6
  },
  date: {
    textAlign: 'right',
    flex: 3,
    color: '#D3D3D3',
    fontSize: 10
  },
  likesRow: {
    alignItems: 'flex-end'
  },
  likesWrapper: {
    marginRight: 35,
    marginBottom: 15,
    flexDirection: 'row'
  },
  likesCount: {
    fontSize: 12,
    marginRight: 7,
    marginTop: 2
  },
  heartIcon: {
    fontSize: 18
  }
})
