/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
// import {Linking} from 'react-native';
import {View, Text, StatusBar} from 'react-native';
import {useInitialURL} from './useInitialurl';
import {useLinkingURL} from './useLinkingURL';
import {Button} from 'react-native';

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [initialUrl, isProcessing, setInitialUrl] = useInitialURL();
  const linkingUrl = useLinkingURL();
  const {navigate} = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (linkingUrl) {
      navigate('Second', {id: '005'});
    }
  }, [linkingUrl, navigate]);

  useEffect(() => {
    console.log({initialUrl});
    if (!loading && !isProcessing && initialUrl) {
      setInitialUrl(null);
      navigate('Second', {id: '123'});
    }
  }, [initialUrl, isProcessing, loading, navigate, setInitialUrl]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
        }}>
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
      }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Second"
        onPress={() => navigate('Second', {id: '0'})}
      />
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

// const config = {
//   screens: {
//     HomeScreen: {
//       path: 'screen/:id',
//     },
//   },
// };

const linking = {
  prefixes: ['deeplinking://', 'https://rich-seal-43.deno.dev/'],
  // config,
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
