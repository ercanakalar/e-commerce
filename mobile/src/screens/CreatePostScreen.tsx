import React from 'react';
import { Button, TextInput } from 'react-native';
import { CreatePostScreenProps } from '../types/screens/createPostScreenType';

const CreatePostScreen = ({ navigation }: CreatePostScreenProps) => {
  const [postText, setPostText] = React.useState('');

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
