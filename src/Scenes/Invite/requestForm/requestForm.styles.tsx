import { StyleSheet, Dimensions } from 'react-native';
import palette from '../../../Styles/Themes/palette';
import background from '../../../Styles/Themes/background';

const { width, height } = Dimensions.get("window");

const paddingHorizontal = 30
const textInputHeight = 60
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'space-around',
    // justifyContent: 'center',
    alignItems: "flex-start",
    //backgroundColor: palette.secondary
  },
  subContainer: {
    paddingHorizontal: paddingHorizontal,
  },
  underline: {
    height: textInputHeight,
    width: width - (2 * paddingHorizontal),
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  textInput: {
    height: textInputHeight,
    //marginVertical: 30, 
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    //backgroundColor: 'black'
  },
})