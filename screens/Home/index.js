import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Logo from "../../components/Logo";
import Screen from "../../components/Screen";

const Home = ({navigation}) => {
  return (
    <Screen style={{backgroundColor: "#000"}}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/MS-Specs-Hero-Desktop.jpg")}
        resizeMode="contain"
      >
        <View style={styles.logo}>
          <Logo color={"#ddd"}/>
        </View>
        <View style={styles.models}>
          <Text style={styles.titles}>Model X</Text>
          <Text style={styles.activeTitles}>Model S</Text>
          <Text style={styles.titles}>Model Y</Text>
        </View>
        <View style={styles.properties}>
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
          <View style={styles.acceleration}>
            <Text style={{ color: "#7B8EA0", fontSize: 20}}>Acceleration: </Text>
            <Text style={styles.smallTitles}>0-60 mph in 3.1 sec</Text>
          </View>
          <View style={styles.acceleration}>
            <Text style={{ color: "#7B8EA0", fontSize: 20 }}>Range: </Text>
            <Text style={styles.smallTitles}>375 - 405 miles</Text>
          </View>
          <TouchableOpacity style={styles.TouchableOpacitys} onPress={()=>navigation.navigate("Details")}>
            <Text style={styles.activeTitles}>ORDER NOW</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Screen>
  );
};

export default Home;

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
    padding: 15,
    margin: 10,
    width: "65%",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
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
