import React, { Component }  from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export class CarGarageIcon extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    render() {
        const { car } = this.props;
        if(!car){
            return (
                <TouchableHighlight style={styles.carIcon} onPress={() => console.log("Pressed")}>
                    <Icon name='plus' style={styles.carIcon} />
                </TouchableHighlight>
            );
        }
        else {
            return (
                <View style={styles.carIcon}>
                    <View>
                        <Image source={{ uri: car.carInfo.image}} style={styles.image} />
                    </View>
                    <View style={styles.carInfoIcon}>
                        <Text>{car.carInfo.car.make}</Text>
                        <TouchableOpacity style={styles.button} onPress={(console.log("Pressed"))}>
                                <Text>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({
  carIcon: {
    margin: 7,
    padding: 5,  
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
    width: 140
  },
  carInfoIcon: {
    flexDirection: 'row',
  },
  image: {
    width: 140,
    height: 120,
  },
  button: {
    padding: 1,
    alignItems: 'center',
    borderColor: '#000000',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
})