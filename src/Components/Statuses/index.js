import React from 'react'
import { Status } from './Status'
export * from './StatusMenu'

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
