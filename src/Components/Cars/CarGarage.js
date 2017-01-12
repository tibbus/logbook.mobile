import React, { Component }  from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native'
import { CarGarageIcon } from './'


const createCarGarageIcon = (car, id) => <CarGarageIcon key={id} car={car}/>;

export class CarGarage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { cars } = this.props;
        return (
        <View>
            <Text>GARAGE</Text>
            <ScrollView 
            automaticallyAdjustContentInsets={false}
            horizontal={true}
            style={[styles.scrollView, styles.horizontalScrollView]}>
                {<CarGarageIcon/>}
                {cars.map(createCarGarageIcon)}
            </ScrollView>
        </View>
        );
    }
}

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 200,
  }
})