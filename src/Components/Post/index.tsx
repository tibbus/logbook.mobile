import React from 'react'
import { Post } from './Post'
export * from './PostMenu'

export const getPost = (props = {}) => {
  const { type }: any = props

  switch (type) {
    default:
      return (
        <Post {...props} />
      )
  }
}

export {
  Post
}
