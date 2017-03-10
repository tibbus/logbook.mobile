import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { getUserFeed } from '../../Actions/feed'

const stateToProps = ({ user }) => ({ user });

@connect(stateToProps)
export class Feed extends Component {
    
    constructor(props) {
        super(props)

        const { user, dispatch } = this.props;

        dispatch(getUserFeed(user.id))
    }

    render () {
        return (
            <View>
                <Text>User feed</Text>
            </View>
        )
    }

}