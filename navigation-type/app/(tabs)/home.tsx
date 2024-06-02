import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import SearchBar from '@/components/shared/SearchBar';

export default function TabOneScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <Text style={styles.title}>Home Screen will be added</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
