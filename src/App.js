import React, {
  Component
} from 'react'
import { RootNav } from './Components'
import { Provider } from 'react-redux'
import { store } from './store'

export class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    )
  }

}
