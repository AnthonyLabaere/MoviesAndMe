import React from 'react';

import FilmDetail from './components/FilmDetail'
import Search from './components/Search'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import Store from './store/configureStore'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Search} />
          <Stack.Screen name="FilmDetail" component={FilmDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}