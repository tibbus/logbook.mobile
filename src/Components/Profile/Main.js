import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Info } from './'

export class Main extends Component {

    constructor (props) {
        super(props)
    }

    render() {
        const { user } = this.props
        return (
            <View>
                <Image source={{ uri: user.coverImg}} style={styles.photo} />
                <Info user = {user}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    photo: {
        height: 40,
        width: 40,
  },
});