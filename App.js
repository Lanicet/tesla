import React, {useState} from 'react';
import { Image, Text, StatusBar, View } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigation/rootNavigation';
import AppNavigator from './navigation/AppNavigator';
 const  App = ()=> {
 
  const [isReady, setisReady] =useState(false)
  const   _cacheResourcesAsync = async()=> {
    const images = [require('./assets/splash.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    }); 
    return Promise.all(cacheImages);
  }

    if (!isReady) {
      return (
        <AppLoading
          startAsync={_cacheResourcesAsync}
          onFinish={() => setisReady(true)}
          onError={console.warn}
        />
      ); }

    return (
      <NavigationContainer ref={navigationRef}>
        <AppNavigator/>
      </NavigationContainer>
    );
  


}

export default App;