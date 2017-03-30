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

export const HeadingOne = (text) => (
  <Text style={styles.textTitle}>{text()}</Text>
)

export const HeadingTwo = (text) => (
  <Text style={styles.textSubtitle}>{text()}</Text>
)

export const HeadingOneWhite = (text) => (
  <Text style={styles.textTitleWhite}>{text()}</Text>
)

export const HeadingTwoWhite = (text) => (
  <Text style={styles.textSubtitleWhite}>{text()}</Text>
)

export const ParagraphWhite = (text) => (
  <Text style={styles.textParagraphWhite}>{text()}</Text>
)