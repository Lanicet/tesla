import { StyleSheet, Text, SafeAreaView, View, ImageBackground } from 'react-native';
import React from 'react';
import Logo from '../../components/Logo'
import Screen from '../../components/Screen';

const Home = () => {
  
  return (
    <Screen >
      <ImageBackground style={styles.image} source={require("../assets/MS-Specs-Hero-Desktop.jpg")} resizeMode="cover">
      <View style={styles.logo}>
          <Logo/> 
        </View> 
      </ImageBackground>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  logo:{  
    flex: 1,
    alignItems: "center",
    top: 50,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});
