import { Button, Text, View } from 'react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import InfoModal from '../components/InfoModal';
import { getStorage } from '../utils/localStorage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation, route }: any) => {
  // console.log('HomeScreen route.params?.post:', route.params?.post);
  const [post, setPost] = useState<string>('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <InfoModal />,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const run = () => {
        const post = getStorage('post');
        if (post) setPost(post);
        else setPost('');
      };
      run();
    }, [])
  );

  return (
    <SafeAreaView
      style={{ flex: 1, paddingBottom: 24 }}
      edges={{ bottom: 'maximum' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title='Create post'
          onPress={() => navigation.navigate('CreatePost')}
        />
        <Text style={{ margin: 10 }}>Post: {post}</Text>
        <Button
          title='Go to Details'
          onPress={() => {
            navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
        <Button
          onPress={() => navigation.navigate('Modal')}
          title='Open Modal'
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
