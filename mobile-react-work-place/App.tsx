import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Linking, Platform } from 'react-native';

import DetailsScreen from './src/screens/DetailsScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import { RootStackParamList } from './src/types/screens/screens';
import TabSections from './src/tabs/TabSections';
import ModalScreen from './src/screens/ModalScreen';
import { useEffect, useRef, useState } from 'react';
import { getStorage, saveStorage } from './src/utils/localStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: '',
      Details: 'details/:itemId',
      CreatePost: 'createPost',
      Tab: 'tab',
      Modal: 'modal',
      Drawer: 'drawer',
    },
  },
};

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

export default function App() {
  const [isReady, setIsReady] = useState(Platform.OS === 'web'); // Don't persist state on web since it's based on URL
  const [initialState, setInitialState] = useState();
  const navigationRef: any = useNavigationContainerRef<any>();
  const routeNameRef: any = useRef<any>();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          // Only restore state if there's no deep link
          const savedStateString = await getStorage(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }


  return (
    <SafeAreaProvider>
      <NavigationContainer
        initialState={initialState}
        linking={linking}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute().name;
        }}
        onStateChange={async (state) => {
          saveStorage(PERSISTENCE_KEY, JSON.stringify(state));
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute().name;
          const trackScreenView = (name: any) => {
            console.log(name, 'trackScreenView in App');

            // Your implementation of analytics goes here!
          };

          if (previousRouteName !== currentRouteName) {
            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName;

            // Replace the line below to add the tracker from a mobile analytics SDK
            await trackScreenView(currentRouteName);
          }
        }}
      >
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
