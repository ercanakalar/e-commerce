import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { deleteItemAsync } from 'expo-secure-store';
import { deleteStorage } from '../utils/localStorage';
import { useFocusEffect } from '@react-navigation/native';

const SettingsScreen = () => {
  useFocusEffect(
    useCallback(() => {
      const run = async () => {
        await deleteStorage('post');
      };
      run();
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SettingsScreen!</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
