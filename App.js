import React, {useState} from 'react';
import { Image, Text, StatusBar, View } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigation/rootNavigation';
import AppNavigator from './navigation/AppNavigator';
import {useFonts} from 'expo-font';
 const  App = ()=> {
 
  const [isReady, setisReady] =useState(false)
  const   _cacheResourcesAsync = async()=> {
    const images = [require('./assets/splash.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    }); 
    return Promise.all(cacheImages);
  }
  const [fontsLoaded] = useFonts({
    'Gotham-Medium': require('./assets/fonts/Gotham-Medium.ttf'),
    'Gotham-Bold': require('./assets/fonts/Gotham-Bold.otf'),
    'Gotham-Black': require('./assets/fonts/Gotham-Black.otf'),
    'Gotham-Light': require('./assets/fonts/Gotham-Light.otf'),
    'Gotham-Thin': require('./assets/fonts/Gotham-Thin.otf'),
    'Gotham-Rounded-Book': require('./assets/fonts/Gotham-Rounded-Book.otf'),
    
  });
    if (!isReady && !fontsLoaded) {
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