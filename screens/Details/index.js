import * as React from 'react';
import { Text, Animated, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const {height, width} = Dimensions.get('screen');
function MyTabBar({ state, descriptors, navigation, position }) {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          });
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Animated.Text style={{ opacity }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
function Car() {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image style={{width, height:height*.4, resizeMode:"cover"}} source={require('../../assets/images/models/ArachnidWheels/red/2.jpg')}/>
      <View style={styles.range}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.activeTitles}>300 mi</Text>
              <Text style={styles.smallTitles}>Range (EPA est.)</Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View
              style={{
                flexDirection: "column",
                textAlign: "center",
                padding: 10,
              }}
            >
              <Text style={styles.activeTitles}>AWD</Text>
              <Text style={styles.smallTitles}>Dual Motor</Text>
            </View>
          </View>
    </View>
  );
}

function Exterior() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Exterior!</Text>
    </View>
  );
}

function Interior() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Exterior!</Text>
      </View>
    );
  }
  function Autopilot() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Exterior!</Text>
      </View>
    );
  }
const Tab = createMaterialTopTabNavigator();

export default function Details() {
  return (


      <Tab.Navigator 
      >
        <Tab.Screen name="1. Car" component={Car} />
        <Tab.Screen name="2. Exterior" component={Exterior} />
        <Tab.Screen name="3. Interior" component={Interior} />
        <Tab.Screen name="4. Autopilot" component={Autopilot} />
      </Tab.Navigator>

  );
}
const styles = StyleSheet.create({
    logo: {
      flex: 1,
      alignItems: "center",
      top: 50,
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
    models: {
      flex: 3,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "flex-start",
    },
    titles: {
      color: "#7B8EA0",
      fontSize: 25,
      fontWeight: "200",
    },
    activeTitles: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "900",
    },
    smallTitles: {
      color: "#fff",
    },
    properties: {
      flex: 2.5,
      alignItems: "center",
    },
    TouchableOpacitys: {
      borderColor: "#C62A2E",
      padding: 9,
      margin: 10,
      width: "65%",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 25,
      backgroundColor: "transparent",
      bottom:-20
    },
    verticleLine: {
      height: 50,
      width: 0.5,
      backgroundColor: "#909090",
    },
    range: {
      paddingTop: 10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      marginBottom: 20,
    },
    acceleration: {
      flexDirection: "row",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      padding:4
    },
  });
  