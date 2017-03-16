import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { Info } from './'

const { width, height } = Dimensions.get("window");

export class Main extends Component {

    constructor (props) {
        super(props)
    }

    render() {
        const { user, carCount } = this.props;
        const imageUrl = 'https://i.ytimg.com/vi/1JbvNF8g3Aw/maxresdefault.jpg';

        return (
            <View>
                {/* <Image source={{ uri: user.coverImg}} style={styles.photo} /> */}
                <Image source={{ uri: imageUrl}} style={styles.photo} />
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
        height: 350,
        width
  },
});
