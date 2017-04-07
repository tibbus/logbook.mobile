import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './styles';
import { capitalize } from 'underscore.string'

export const TagsBox = (rowData) => (
    <Text style={styles.tagsRow}>{capitalize(rowData, true)}</Text>
)