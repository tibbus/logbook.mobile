import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';
import styles from './styles';

export const StatsText = (statsCount, statsCaption) => (
  <View style={styles.statsContainer}>
    <Text style={styles.statsText}>{statsCount()}</Text>
    <Text style={styles.captionText}>{statsCaption}</Text>
  </View>
)

export const H1 = (text) => (
  <Text style={styles.textTitle}> {text()}</Text>
)
