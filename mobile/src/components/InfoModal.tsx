import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const InfoModal = () => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.createPostButton]}
      onPress={() => console.log('write')}
    >
      <Text style={[styles.buttonText, styles.createPostButtonText]}>Info</Text>
    </TouchableOpacity>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  createPostButtonText: {
    fontSize: 18,
  },
  createPostButton: {
    backgroundColor: '#ffff',
  },
});
