import React from 'react';

import FilmDetail from './components/FilmDetail'
import Search from './components/Search'
import Favorites from './components/Favorites'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import { Image, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

function SearchScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
  )
}

function FavoritesScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'SearchScreen') {
                // SearchScreen
                return <Image
                  source={require('./images/ic_search.png')}
                  style={styles.icon}/>
              } 
                // Favorites
                return <Image
                  source={require('./images/ic_favorite.png')}
                  style={styles.icon}/>
            },
          })}
          tabBarOptions={{
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
          }}>
          <Tab.Screen name="SearchScreen" component={SearchScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})
