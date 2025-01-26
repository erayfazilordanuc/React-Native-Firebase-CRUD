import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styles from '../styles';
import {LinearGradient} from 'react-native-linear-gradient';

// TO DO buradaki propsa iki renk parametresi eklenip gradienti özelleştirebiliriz
export const GradientTitle: React.FC<TitleProps> = ({style, children}) => {
  return (
    <View>
      <LinearGradient
        colors={['#1da9ff', '#ff9c1d']}
        start={{x: 0.1, y: 0}}
        end={{x: 0.9, y: 0}}
        style={styles.headerContainer}>
        <Text style={StyleSheet.flatten([styles.title, style])}>{children}</Text>
      </LinearGradient>
    </View>
  );
};
