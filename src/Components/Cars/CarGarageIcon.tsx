import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CaptionButton } from '../Button'

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
                <View>
                    <View>
                        <TouchableHighlight onPress={onPress}>
                            <Image source={{ uri: car.carInfo.image }} style={styles.image} />
                        </TouchableHighlight>
                    </View>

                    <View style={{ width: photoWidth }}>
                        {CaptionButton(() => onPress, car.carInfo.car.make, car.carInfo.car.model)}
                    </View>
                </View>
            );
        }
    }
}

const photoWidth = 250;
const photoHeight = 150;

var styles = StyleSheet.create({
    captionButtonView: {
        flex: 1,
    } as React.ViewStyle,
    carIcon: {
        //marginRight: 20,
        //marginBottom: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#eaeaea',
        borderRadius: 3,
        width: photoWidth,
        height: photoHeight,
    } as React.ViewStyle,
    carInfoIcon: {
        flexDirection: 'row',
    } as React.ViewStyle,
    image: {
        width: photoWidth,
        height: photoHeight,
        borderRadius: 3,
        marginBottom: 15,
        marginRight: 20,
    },
})