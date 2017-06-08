import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { capitalize } from 'underscore.string';

import captionStyles from '../../Components/Button/styles';
import pallete from '../../Styles/Themes/palette';

export class CarGarageIcon extends Component<any, any> {

    render() {
        const { car, onPress } = this.props;
        if (!car) {
            return (
                <TouchableHighlight style={styles.carIconWrapper} onPress={onPress}>
                    <View>
                        <Icon name='plus' style={styles.carIcon} />
                        <Text style={styles.carIconText}>Add Car</Text>
                    </View>
                </TouchableHighlight>
            );
        }
        else {
            return (
                <TouchableHighlight onPress={onPress}>
                    <View>
                        <Image source={{ uri: car.carInfo.image }} style={styles.image} />
                        <Text lineBreakMode="tail" numberOfLines={1} style={captionStyles.captionText}>
                            {capitalize(car.carInfo.car.make)} {capitalize(car.carInfo.car.model)}
                        </Text>
                        <Text style={captionStyles.captionText}>{car.carStats ? car.carStats.followersCount.count : 0} Followers</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }
}

const photoWidth = 250;
const photoHeight = 150;

var styles = StyleSheet.create({
    captionButtonView: {
        flex: 1,
    },
    carIconWrapper: {
        flexDirection: 'column',
        backgroundColor: '#eaeaea',
        borderRadius: 3,
        width: photoWidth,
        height: photoHeight,
        marginRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        marginRight: 20
    },
    carIcon: {
        fontSize: 50,
        color: pallete.primary
    },
    carIconText: {
        fontSize: 11,
        color: pallete.primary
    },
    carInfoIcon: {
        flexDirection: 'row',
    },
    image: {
        width: photoWidth,
        height: photoHeight,
        borderRadius: 3,
        marginBottom: 15,
        marginRight: 20,
    },
})