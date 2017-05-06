import React from 'react';
import { Text, View } from 'react-native';
import textStyle from '../../Styles/text';

export const StatsText = (statsCount, statsCaption) => (
  <View style={textStyle.statsContainer}>
    <Text style={textStyle.statsText}>{statsCount()}</Text>
    <Text style={textStyle.statsCaptionText}>{statsCaption}</Text>
  </View>
)
