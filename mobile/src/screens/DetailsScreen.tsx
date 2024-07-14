import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { DetailsScreenProps } from '../types/screens/detailsScreenType';

const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {
  const { itemId, otherParam } = route.params;

  console.log('DetailsScreen route.params?.post:', itemId);

  useEffect(() => {
    navigation.setOptions({
      title: otherParam,
      headerBackTitle: 'A much too long text for back button',
    });
  }, [navigation, otherParam]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title='Go to Details... again'
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title='Go to Home'
        onPress={() => navigation.navigate('Home', { post: '' })}
      />
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;
