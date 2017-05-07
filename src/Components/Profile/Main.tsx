import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Info } from './'

const { width, height } = Dimensions.get("window");

export class Main extends Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        const { user, carCount } = this.props;

        return (
            <View style={styles.container}>
                <Image style={styles.backdrop} source={{ uri: user.coverImg }}>
                    <View style={{flex: 1}} />
                    <Icon name='camera' style={styles.icon} />
                </Image>
                <Info style={styles.info} user={user} />
            </View>
        )
    }
}

const coverPhotoHeight = 275;
const profilePictureHeight = 50;
const styles = StyleSheet.create({
    container: {
        flex: 6
    },
    backdrop: {
        flex: 1.4
    },
    info: {
        flex: 1,
    },
    icon: {
        fontSize: 25,
        fontWeight: '700',
        padding: 30,
        paddingBottom: 10,
        color: '#696969',
        alignSelf: 'flex-end'
    },
});
