import { Button, Text, View } from 'react-native';
import { useEffect } from 'react';

import InfoModal from '../components/InfoModal';

const HomeScreen = ({ navigation, route }: any) => {
  console.log('HomeScreen route.params?.post:', route.params?.post);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <InfoModal />,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title='Create post'
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
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
        title='Go to TabScreen'
        onPress={() => {
          navigation.navigate('Tab');
        }}
      />
    </View>
  );
};

export default HomeScreen;
