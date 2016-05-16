import React from 'react-native'
import { Status } from './Status'

export const getStatus = (props = {}) => {
  const { type } = props

  switch (type) {
    default:
      return (
        <Status {...props} />
      )
  }
}

export {
  Status
}
