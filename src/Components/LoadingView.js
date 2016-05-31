import React, {
  ActivityIndicatorIOS,
  View
} from 'react-native'

export const LoadingView = ({
  children,
  hideWhileLoading = true,
  isLoading,
  style = {}
}) => (
  <View style={style}>
    {isLoading ? <ActivityIndicatorIOS animating={Boolean(true)} size='large' /> : null}
    {hideWhileLoading && isLoading ? null : children}
  </View>
)
