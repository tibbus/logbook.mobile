import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { CarGarageIcon } from './CarGarageIcon';
import textStyle from '../../Styles/text';

const createCarGarageIcon = function (car, navigator, user) {
    return <CarGarageIcon key={car.id} car={car} onPress={() => navigator.push({
        id: 'car',
        passProps: {
            car: car,
            carOwner: {
                profileImage: user.profileImg,
                name: user.name
            }
        }
    })}
    />;
};

export class CarGarage extends Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        const { cars, user, navigator } = this.props;
        return (
            <View style={styles.container}>
                <Text style={[textStyle.subtitle, { paddingLeft: 30 }]}>GARAGE</Text>
                <ScrollView automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    style={[styles.horizontalScrollView]}>
                    {
                        cars.userCars.map(function (car) {
                            return createCarGarageIcon(car, navigator, user);
                        })
                    }
                    <CarGarageIcon onPress={() => navigator.push({ id: 'addCar' })} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    horizontalScrollView: {
        //@todo investigate why paddingRight is not working in the scrollView
        paddingHorizontal: 30,
        paddingRight: 30,
        flex: 1,
        height: 220
    }
});
