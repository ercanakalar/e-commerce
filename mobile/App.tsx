import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/DetailsScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import HomeScreen from './src/screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/screens/screens';
import TabSections from './src/tabs/TabSections';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Tab'>
        <Stack.Screen
          name='Tab'
          component={TabSections}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='CreatePost' component={CreatePostScreen} />
        <Stack.Screen name='Details' component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
