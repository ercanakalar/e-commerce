import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { ModalScreenProps } from '../types/screens/modalScreenType';

const ModalScreen = ({ navigation }: ModalScreenProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title='Dismiss' />
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({});
