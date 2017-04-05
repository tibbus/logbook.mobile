import React from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ModalDropdown from 'react-native-modal-dropdown'

export const getCarSelectionView = (editMode, carCollection, onSelectCar, selectedCar) => {
    return (
        <View style={styles.carSelectorContainer}>
            {/*<Text>Current Car</Text>*/}
            {editMode ? getCarSelection(carCollection, onSelectCar, selectedCar) : displaySelectedCar(selectedCar)}

        </View>
    )
}

const getCarSelection = (carCollection, onSelectCar, selectedCar) => {
    return (
        <ModalDropdown
            options={carCollection}
            renderRow={(row) => displaySelectedCar(row)}
            onSelect={(id, value) => { onSelectCar(id, value) }}>
            <View style={styles.row}>
                <View style={styles.opacityView}>
                    <Image source={{ uri: selectedCar.image }} style={styles.photo} />
                </View>
                <View style={styles.selectedCarView}>
                    <Text lineBreakMode="clip" numberOfLines={1} style={styles.selectedCarText}>{selectedCar.make + ' ' + selectedCar.model}  <Icon name='chevron-down' style={styles.chevronIcon} /></Text>
                </View>
            </View>
        </ModalDropdown>
    )
}

const displaySelectedCar = (data) => {
    return (
        <TouchableHighlight>
            <View style={styles.modalCarView}>
                <Image source={{ uri: data.image }} style={styles.photo} />
                            <View style={styles.selectedCarView}>
                <Text style={styles.selectedCarText}>{`${data.model} (${data.make}) (${data.yearOfManufacture})`}</Text>
            </View>
            </View>
        </TouchableHighlight>
    )
}

const { width, height } = Dimensions.get("window");
const photoWidth = 30;
const styles = StyleSheet.create({
    selectedCarView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        // paddingLeft: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        backgroundColor: 'yellow',
    },
    opacityView: {
        opacity: 0.3,
    },
    carSelectorContainer: {
        flex: 1,
        // paddingHorizontal: 10
    },
    photo: {
        height: photoWidth,
        width: photoWidth,
        borderRadius: photoWidth / 2
    },
    modalCarView: {
        flex: 1,
        flexDirection: 'row',
        width: width,
        paddingVertical: 15,
        backgroundColor: 'red',
    } as React.ViewStyle,
    selectedCarText: {
        fontSize: 15,
        fontWeight: "600",
                paddingLeft: 10,

    },
    chevronIcon: {
        color: 'red',
    }

})