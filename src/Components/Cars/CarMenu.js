import React from 'react-native'
import { ListSelect } from '../ListSelect'

const getOptions = () => {
  return [
    {
      section: 'details',
      header: {
        description: 'Car Info'
      },
      options: [{
        description: 'Details',
        value: 'details'
      }, {
        description: 'MOT',
        value: 'mot'
      }, {
        description: 'Tax',
        value: 'tax'
      }]
    },
    {
      section: 'actions',
      header: {
        description: 'Actions'
      },
      options: [{
        description: 'Delete',
        value: 'delete'
      }]
    }
  ]
}

export const CarMenu = props => (
  <ListSelect {...props} options={getOptions()} />
)
