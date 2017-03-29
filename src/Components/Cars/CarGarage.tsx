import React, { Component }  from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native'
import { CarGarageIcon } from './'


const createCarGarageIcon = function(car, navigator, user) {
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
}

export class CarGarage extends Component<any, any> {

    constructor(props) {
        super(props)
    }

    render() {
        const { cars, user, navigator } = this.props;
        return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>GARAGE</Text>
            <ScrollView
                automaticallyAdjustContentInsets={false}
                horizontal={true}
                style={[styles.scrollView, styles.horizontalScrollView]}>
                    {
                        cars.userCars.map(function(car) {
                            return createCarGarageIcon(car, navigator, user);
                        })
                    }
                    {<CarGarageIcon onPress={() => navigator.push({id: 'addCar'})}/>}
            </ScrollView>
        </View>
        );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    //allowFontScaling: true
  },
  scrollView: {
    flex: 1,
  },
  horizontalScrollView: {
    height: 200,
  },
  textHeading: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 10
  } as React.TextStyle
})