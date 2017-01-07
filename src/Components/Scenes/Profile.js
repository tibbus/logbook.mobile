import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Main } from '../Profile'
import { getUserFollowCount, setUserProfile } from '../../Actions/user.js'

const stateToProps = ({ user }) => ({ user });

@connect(stateToProps)
export class Profile extends Component {

    constructor () {
        super(...arguments);

        setUserProfile();
        getUserFollowCount(this.props.user.id);

    }

    render() {
        const { user } = this.props;
        return (
            <Main user = {user}/>
        )        
    }
}