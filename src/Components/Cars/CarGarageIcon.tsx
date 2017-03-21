import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export class CarGarageIcon extends Component<any, any> {

    render() {
        const { car, onPress } = this.props;
        if (!car) {
            return (
                <TouchableHighlight style={styles.carIcon} onPress={onPress}>
                    <Icon name='plus' style={styles.carIcon} />
                </TouchableHighlight>
            );
        }
        else {
            return (
                <View style={styles.carIcon}>
                    <View>
                        <TouchableHighlight style={styles.carIcon} onPress={onPress}>
                            <Image source={{ uri: car.carInfo.image }} style={styles.image} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.carInfoIcon}>
                        <Text>{car.carInfo.car.make}</Text>
                        <TouchableHighlight style={styles.button} onPress={onPress}>
                            <Text>Edit Profile</Text>
                        </TouchableHighlight>
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
    } as React.ViewStyle,
    carInfoIcon: {
        flexDirection: 'row',
    } as React.ViewStyle,
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
    } as React.ViewStyle,
})