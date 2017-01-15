import React, { Component }  from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native'
import { CarGarageIcon } from './'


const createCarGarageIcon = (car, id, navigator) => <CarGarageIcon key={id} car={car} onPress={() => navigator.push({id: 'car'})}/>;

export class CarGarage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { cars, navigator } = this.props;
        return (
        <View>
            <Text>GARAGE</Text>
            <ScrollView 
                automaticallyAdjustContentInsets={false}
                horizontal={true}
                style={[styles.scrollView, styles.horizontalScrollView]}>
                    {<CarGarageIcon onPress={() => navigator.push({id: 'addCar'})}/>}
                    {cars.userCars.map(createCarGarageIcon)}
            </ScrollView>            
        </View>
        );
    }
}

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    flex: 1,
  },
  horizontalScrollView: {
    height: 200,
  }
})