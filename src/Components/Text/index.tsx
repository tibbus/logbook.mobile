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
    <Text style={styles.statsCaptionText}>{statsCaption}</Text>
  </View>
)

export const HeadingOne = (text) => (
  <Text style={styles.title}>{text()}</Text>
)

export const HeadingTwo = (text) => (
  <Text style={styles.subtitle}>{text()}</Text>
)

export const HeadingOneWhite = (text) => (
  <Text style={styles.titleWhite}>{text()}</Text>
)

export const HeadingTwoWhite = (text) => (
  <Text style={styles.headingTwoWhite}>{text()}</Text>
)

export const HeadingThreeWhite = (text) => (
  <Text style={styles.headingThreeWhite}>{text()}</Text>
)

export const ParagraphWhite = (text) => (
  <Text style={styles.paragraphWhite}>{text()}</Text>
)

export const ParagraphBoldWhite = (text) => (
  <Text style={styles.paragraphBoldWhite}>{text()}</Text>
)

export const ParagraphBoldHighlightWhite = (text) => (
  <Text style={styles.paragraphBoldHighlightWhite}>{text()}</Text>
)

export const CaptionWhite = (text) => (
  <Text style={styles.captionWhite}>{text()}</Text>
)