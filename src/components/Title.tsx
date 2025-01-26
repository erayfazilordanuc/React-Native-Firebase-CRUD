import React from 'react';
import {StyleSheet, Text} from 'react-native';
import styles from '../styles';

export const Title: React.FC<TitleProps> = ({children, style}) => {
  return (
    <Text style={StyleSheet.flatten([styles.title, style])}>{children}</Text>
  );
};
