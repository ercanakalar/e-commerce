import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DetailsScreen from './src/screens/DetailsScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import { RootStackParamList } from './src/types/screens/screens';
import TabSections from './src/tabs/TabSections';
import ModalScreen from './src/screens/ModalScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Tab'>
          <Stack.Group>
            <Stack.Screen
              name='Tab'
              component={TabSections}
              options={{ headerShown: false }}
            />
            <Stack.Screen name='CreatePost' component={CreatePostScreen} />
            <Stack.Screen name='Details' component={DetailsScreen} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name='Modal' component={ModalScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
