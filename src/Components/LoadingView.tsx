import React from 'react'
import {
  ActivityIndicator,
  View
} from 'react-native'

export const LoadingView = ({
  children = null,
  hideWhileLoading = true,
  isLoading,
  style = {}
}) => (
  <View style={style}>
    {isLoading ? <ActivityIndicator animating={Boolean(true)} size='large' /> : null}
    {hideWhileLoading && isLoading ? null : children}
  </View>
)
