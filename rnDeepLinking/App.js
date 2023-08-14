/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
// import {Linking} from 'react-native';
import {View, Text, StatusBar} from 'react-native';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

function SecondScreen() {
  const {params} = useRoute();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
      }}>
      <Text>Second Screen - id: {params.id}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const config = {
  screens: {
    Second: {
      path: 'screen/:id',
      parse: {
        id: id => `user-${id}`,
      },
    },
  },
};

const linking = {
  prefixes: ['deeplinking://', "https://rich-seal-43.deno.dev/"],
  config,
};

const App: () => React$Node = () => {
  // useEffect(() => {
  //   Linking.getInitialURL()
  //     .then(url => {
  //       if (url) {
  //         console.log('Initial url is: ' + url);
  //       }
  //     })
  //     .catch(err => console.error('An error ocurred', err));
  // }, []);

  // useEffect(() => {
  //   Linking.addEventListener(
  //     'url',
  //     event => {
  //       console.log('url ', event);
  //     },
  //     [],
  //   );

  //   return () => {
  //     Linking.removeAllListeners('url');
  //   };
  // }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} path />
          <Stack.Screen name="Second" component={SecondScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
