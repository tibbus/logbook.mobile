import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
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
                <View style={styles.container}>
                    <Image
                        style={styles.backdrop}
                        source={{ uri: user.coverImg }}>
                        <View style={styles.backdropView}>
                            <View style={styles.iconContainer}>
                                <Icon name='camera' style={styles.icon} />
                            </View>
                            <View style={styles.subContainer}>
                                <Image
                                    style={styles.profilePicture}
                                    source={{ uri: user.profileImg }}>
                                </Image>
                                <Text style={styles.headline}>{user.name}</Text>
                                {/*{HeadingOneWhite(() => user.name)}*/}
                            </View>
                        </View>
                    </Image>
                    <Info style={styles.text} user={user} />
                </View>
            </View>
        )
    }
}

const coverPhotoHeight = 275;
const profilePictureHeight = 50;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingTop: coverPhotoHeight - 200,
    },
    backdrop: {
        width: width,
        height: coverPhotoHeight,
    },
    backdropView: {
        height: coverPhotoHeight,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    headline: {
        fontSize: 40,
        fontWeight: "700",
        marginLeft: 20,
        // backgroundColor: 'rgba(0,0,0,0)',
        color: 'white'
    },
    profilePicture: {
        width: profilePictureHeight,
        height: profilePictureHeight,
        borderRadius: profilePictureHeight / 2,
        borderWidth: 1,
        borderColor: 'white',
    },
    icon: {
        fontSize: 25,
        fontWeight: '700',
        paddingTop: 5,
        paddingLeft: 30,
        //marginRight:
        color: 'rgba(255,255,255,0.5)',
    },
});
