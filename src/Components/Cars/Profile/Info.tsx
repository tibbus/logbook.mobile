import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableHighlight,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatsText } from '../../Text';
import textStyle from '../../../Styles/text';
import { ActionButton } from '../../Button';

const ActionButtons = (owned, onSettingsPress, followed, onFollowPress, onUnFollowPress) => {
    if (owned) {
        return (
            <TouchableHighlight onPress={onSettingsPress}>
                <Text>Settings</Text>
            </TouchableHighlight>
        )
    }
    else if (followed) {
        return (
            <TouchableHighlight onPress={onUnFollowPress}>
                <Text>UnFollow</Text>
            </TouchableHighlight>
        )
    }
    else {
        return (
            <TouchableHighlight onPress={onFollowPress}>
                <Text>Follow</Text>
            </TouchableHighlight>
        )
    }
}

const VerifyButton = (verified, owned, onVerify) => {
    if (verified === false && owned === true) {
        return (
            ActionButton(onVerify, 'Verify')
        )
    }
}


export const Info = ({ ownerImage, ownerName, owned, carStats, onSettingsPress, followed, onFollowPress, onUnFollowPress, verified, onVerifyPress }) => (

    <View style={styles.container}>
        <View style={styles.statContainer}>
            {StatsText(() => '12', 'Posts')}
            {StatsText(() => '37', 'Media')}
            {StatsText(() => carStats.followersCount.count, 'Followers')}
            {ActionButtons(owned, onSettingsPress, followed, onFollowPress, onUnFollowPress)}
        </View>
        <View style={styles.subContainer}>
            <Image source={{ uri: ownerImage }} style={styles.photo} />
            <Text style={textStyle.title}>{ownerName}</Text>
        </View>
        <View style={styles.subContainer}>
            {VerifyButton(verified, owned, onVerifyPress)}
        </View>
        <View>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        padding: 12,
        alignItems: 'center',
    } as React.ViewStyle,
    statContainer: {
        flex: 1,
        flexDirection: 'row'
    } as React.ViewStyle,
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
    } as React.ViewStyle,
    stats: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 15
    } as React.ViewStyle,
    textHeading: {
        marginLeft: 12,
        fontSize: 16,
    },
    text: {
        marginLeft: 12,
        fontSize: 13,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});