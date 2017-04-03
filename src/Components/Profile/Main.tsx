import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native'
import { Info } from './'

const { width, height } = Dimensions.get("window");

export class Main extends Component<any, any> { 

    constructor(props) {
        super(props)
    }

    render() {
        const { user, carCount } = this.props;

        return (
            <View>
                {/*<Image source={{ uri: user.coverImg}} style={styles.photo}/>
                                <Text>{"statValue"}</Text>
                <Info user = {user}/>*/}
                <View style={styles.container}>
                    <Image
                        style={styles.backdrop}
                        source={{ uri: user.coverImg}}>
                        <View style={styles.backdropView}>
                            <Text style={styles.headline}>Janu Shan</Text>
                        </View>
                    </Image>
                    <Info style={styles.text} user = {user}/>
                </View>
            </View>
        )
    }
}

const coverPhotoHeight = 300;
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     marginTop: 20,
    // },
    // photo: {
    //     height: 300
    // },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        //alignItems: 'center',
        //backgroundColor: 'white',
        //width: width
    },
    backdrop: {
        width: width,
        height: coverPhotoHeight,
    },
    backdropView: {
        height: coverPhotoHeight,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    headline: {
        paddingTop: coverPhotoHeight-80,
        fontSize: 40,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white'
    },
    text: {
        //paddingTop: 100,
    }
});
