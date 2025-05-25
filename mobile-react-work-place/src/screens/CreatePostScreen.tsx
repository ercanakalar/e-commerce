import React, { useEffect, useState } from 'react';
import { Alert, Button, TextInput } from 'react-native';

import { CreatePostScreenProps } from '../types/screens/createPostScreenType';
import { saveStorage } from '../utils/localStorage';

const CreatePostScreen = ({ navigation }: CreatePostScreenProps) => {
  const [postText, setPostText] = useState('');
  const hasUnsavedChanges = Boolean(postText);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();
        

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ] 
        );
      }),
    [navigation, hasUnsavedChanges]
  );

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title='Done'
        onPress={() => {
          saveStorage('post', postText);
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
};

export default CreatePostScreen;
