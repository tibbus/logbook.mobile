import React from 'react-native'
import { ListSelect } from '../ListSelect'

const getOptions = () => {
  return [
    {
      section: 'actions',
      header: {
        description: 'Actions'
      },
      options: [{
        description: 'Edit Post',
        value: 'edit'
      }, {
        description: 'Delete Post',
        value: 'delete'
      }]
    }
  ]
}

export const StatusMenu = props => (
  <ListSelect {...props} options={getOptions()} />
)
