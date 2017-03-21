import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native'

export const getStatusView = (editMode, updateStatus, status) => {
  return (
    <View style={styles.contentDescriptionContainer}>
        <Image source={{uri: 'https://maxcdn.icons8.com/iOS7/PNG/75/Users/user_male_circle_filled-75.png'}} style={styles.icon} />
        {
            editMode ? getStatusInput(updateStatus) : getStatusDisplay(status)
        }
       
    </View>
  )
}

const getStatusInput = (updateStatus) => {
    return (
        <TextInput
            onChangeText={(text) => updateStatus(text)}
            placeholder="What's new with car term today? Feeling like: Cruising? Thing? Or something?" 
            returnKeyType='done' 
            multiline={true} 
            style={styles.statusInput}/>
    )
}

const getStatusDisplay = (status) => {
    return (
        <Text>{status}</Text>
    )
}

const styles = StyleSheet.create({
    contentDescriptionContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    icon: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    statusInput: {
        flex:1, 
        marginTop: 20, 
        paddingVertical: 10, 
        borderWidth: 1, 
        borderColor: '#000000'
    }
})