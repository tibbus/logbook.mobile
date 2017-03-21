import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { Info } from './'

const { width, height } = Dimensions.get("window");

export class Main extends Component<any, any> {

    constructor (props) {
        super(props)
    }

    render() {
        const { user, carCount } = this.props;

        return (
            <View>
                <Image source={{ uri: user.coverImg}} style={styles.photo}/>
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
    photo: {
        height: 350
  },
});
