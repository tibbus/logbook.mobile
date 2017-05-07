import React from 'react';
import { Text, View } from 'react-native';

import textStyle from '../../Styles/text';

export const StatsText = ({count, caption}) => (
  <View style={textStyle.statsContainer}>
    <Text style={textStyle.statsText}>{count}</Text>
    <Text style={textStyle.statsCaptionText}>{caption}</Text>
  </View>
)
