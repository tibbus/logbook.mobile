import React from 'react-native'
import { Event } from './Event'

export const getEvent = (props = {}) => {
  const { type } = props

  switch (type) {
    default:
      return (
        <Event {...props} />
      )
  }
}

export {
  Event
}
