import React from 'react';

import FilmDetail from './components/FilmDetail'
import Search from './components/Search'
import Favorites from './components/Favorites'
import Test from './components/Test'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import { Image, StyleSheet } from 'react-native';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

const Stack = createStackNavigator();

function SearchScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Search" component={Search}
          options={{
            headerTitle: 'Recherche'
          }} />
        <Stack.Screen name="FilmDetail" component={FilmDetail}
          options={{
            headerTitle: 'Détail du film'
          }} />
    </Stack.Navigator>
  )
}

function FavoritesScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Favorites" component={Favorites} 
          options={{
            headerTitle: 'Favoris'
          }} />
        <Stack.Screen name="FilmDetail" component={FilmDetail}
          options={{
            headerTitle: 'Détail du film'
          }} />
    </Stack.Navigator>
  )
}

function TestScreen() {
  return (
    <Test />
  )
}

const Tab = createBottomTabNavigator();

function persistor () {
  return persistStore(Store)
}


export default function App() {
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor()}>
          <NavigationContainer>
            <Tab.Navigator 
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  if (route.name === 'SearchScreen') {
                    // SearchScreen
                    return <Image
                      source={require('./images/ic_search.png')}
                      style={styles.icon}/>
                  }  else if (route.name === 'FavoritesScreen') {
                    // Favorites
                    return <Image
                      source={require('./images/ic_favorite.png')}
                      style={styles.icon}/>
                  }

                    // Autre
                    return
                },
              })}
              tabBarOptions={{
                activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
                inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
                showLabel: false, // On masque les titres
                showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
              }}>
              {/* <Tab.Screen name="Test" component={TestScreen} /> */}
              <Tab.Screen name="SearchScreen" component={SearchScreen} />
              <Tab.Screen name="FavoritesScreen" component={FavoritesScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    )
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})
