import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { CarGarageIcon } from './';
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
                <Text style={textStyle.subtitle}>GARAGE</Text>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    style={[styles.scrollView, styles.horizontalScrollView]}>
                    {
                        cars.userCars.map(function (car) {
                            return createCarGarageIcon(car, navigator, user);
                        })
                    }
                    {<CarGarageIcon onPress={() => navigator.push({ id: 'addCar' })} />}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        paddingLeft: 30,
        paddingVertical: 30,
        //allowFontScaling: true
    },
    scrollView: {
        flex: 1,
    },
    horizontalScrollView: {
        height: 220,
    },
});
