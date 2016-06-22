import React, {
  Component,
  Navigator
} from 'react-native'
import { connect } from 'react-redux'
import { CarNavBar } from './CarNavBar'
import { addUserCar, updateUserCars } from '../Actions/user'
import { CarDrawer, CarCreate, CarsEmpty } from './Cars'
import { LoadingView } from './LoadingView'

const configureScene = ({ sceneConfig } = {}) => {
  if (sceneConfig) {
    return sceneConfig
  }

  return Navigator.SceneConfigs.FloatFromRight
}

const stateToProps = ({ cars, loadingStatus, user }) => ({ cars, loadingStatus, user })

@connect(stateToProps)
export class CarsNav extends Component {

  constructor () {
    super(...arguments)
    const { dispatch, cars } = this.props

    if (cars === null) {
      dispatch(updateUserCars())
    }
  }

  renderScene (route, navigator) {
    const { id, index = 0 } = route
    const { cars = [], dispatch, user = {} } = this.props
    const car = cars[index]
    const props = {
      car,
      dispatch,
      navigator,
      rootNav: this.props.rootNav,
      user: user.profile
    }

    switch (id) {
      default:
        return (<CarDrawer {...props} style={{flex: 1}} />)
    }
  }

  addCar () {
    const { dispatch, rootNav } = this.props

    rootNav
      .push({
        id: 'modal',
        component: (
          <CarCreate
            navigator={rootNav}
            onAction={registration => dispatch(addUserCar({ registration }))} />
        )
      })
  }

  renderView () {
    const { cars = [] } = this.props
    if (!cars || !cars.length) {
      return (<CarsEmpty onAddCar={this.addCar.bind(this)} />)
    }
    return (
      <Navigator
        initialRoute={{ id: 'initial' }}
        navigationBar={<CarNavBar cars={cars} />}
        configureScene={configureScene}
        renderScene={this.renderScene.bind(this)}
        sceneStyle={{ paddingTop: 40 }}
       />
    )
  }

  render () {
    const { cars, loadingStatus } = this.props
    const { carsLoading } = loadingStatus
    const carsNull = cars === null
    return (
      <LoadingView style={{flex: 1}}
        isLoading={carsLoading}
        hideWhileLoading={carsNull}>
        {this.renderView()}
      </LoadingView>
    )
  }

}
