import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'

export const getCarSelectionView = (editMode, carCollection, onSelectCar, selectedCar) => {
  return (
    <View style={styles.carSelectorContainer}>
        <Text>Current Car</Text>
        { editMode ? getCarSelection(carCollection, onSelectCar) : displaySelectedCar(selectedCar) }

    </View>
  )
}

const getCarSelection = (carCollection, onSelectCar) => {
    return (
        <ModalDropdown 
            options={carCollection}
            renderRow={(row) => displaySelectedCar(row)}
            onSelect={(id, value) => { onSelectCar(id, value)}} />
    )
}

const displaySelectedCar = (data) => {
    return (
        <TouchableHighlight>
            <View style={styles.selectedCar}>
                <Image source={{ uri: data.image}} style={styles.photo} />
                <Text style={styles.selectedCarFont}>{`${data.model} (${data.make}) (${data.yearOfManufacture})`}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    carSelectorContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    selectedCar: {
        flex: 1, 
        flexDirection: 'row', 
        width:250, 
        height:20
    } as React.ViewStyle,
    selectedCarFont: {
        fontSize: 10
    }

})