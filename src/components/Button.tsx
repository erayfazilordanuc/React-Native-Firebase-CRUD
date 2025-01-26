import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';

export const Button: React.FC<ButtonProps> = ({title, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={StyleSheet.flatten([styles.buttonGeneral, style])}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
