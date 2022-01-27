import React, { useState, useEffect } from "react";
import {
  Text,
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { vehicle, paint, interior } from "../../constants/Tesla";
const { height, width } = Dimensions.get("screen");
function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
            type: "tabPress",
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
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
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
            <Animated.Text style={{ opacity }}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
function Car({ navigation }) {
  const rangeAndPerformance = [
    {
      model: "Model S",
      Acceleration: "3.1 sec",
      Range: "375 - 405 miles",
      TopSpeed: "155 mph",
      Drivetrain: "Dual Motor All-Wheel Drive",
      price: "$94,9990",
    },
    {
      model: "Model S Plaid",
      Acceleration: "1.99 sec*",
      Range: "348 - 396 miles",
      TopSpeed: "200 mph",
      Drivetrain: "Tri Motor All-Wheel Drive",
      price: "$129,99",
    },
  ];
  const [model, setModel] = useState(rangeAndPerformance[0]);

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        style={{ width, height: height * 0.4, resizeMode: "cover" }}
        source={require("../../assets/images/models/ArachnidWheels/red/2.jpg")}
      />
      <View style={styles.range1}>
        {rangeAndPerformance.map((r, index) => (
          <TouchableOpacity
            onPress={() => setModel(rangeAndPerformance[index])}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  color: model.model == r.model ? "#000" : "#bbb",
                  fontFamily: "Gotham-Rounded-Book",
                  fontSize: 25,
                }}
              >
                {r.model}
              </Text>
              <Text
                style={{
                  color: model.model == r.model ? "#C62A2E" : "#bbb",
                  fontFamily: "Gotham-Rounded-Book",
                  fontSize: 22,
                }}
              >
                {r.price}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.range}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.activeTitles}>{model.Acceleration}</Text>
          <Text style={styles.smallTitles}>0-60 mph</Text>
        </View>
        <View style={styles.verticleLine}></View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.activeTitles}>{model.TopSpeed}</Text>
          <Text style={styles.smallTitles}>Top Speed</Text>
        </View>
      </View>
      <Text
        style={{ padding: 10, textAlign: "justify", fontFamily: "Gotham-Thin" }}
      >
        Tesla designed Model S from the ground-up as an electric vehicle — each
        component, including batteries, motors and exterior aerodynamics are
        optimized to benefit from one another and create one of the most
        efficient, yet unbelievably powerful vehicles ever built.*With first
        foot of rollout subtracted.The indicated Plaid top speed requires paid
        hardware upgrades.{" "}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            paddingRight: 70,
            fontFamily: "Gotham-Medium",
            fontSize: 20,
          }}
        >
          {model.price}
        </Text>
        <TouchableOpacity
          style={styles.TouchableOpacitys}
          onPress={() => navigation.navigate("2. Exterior")}
        >
          <Text style={styles.medium}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Exterior({navigation}) {
  const rangeAndPerformance = [
    {
      model: "Model S",
      Acceleration: "3.1 sec",
      Range: "375 - 405 miles",
      TopSpeed: "155 mph",
      Drivetrain: "Dual Motor All-Wheel Drive",
      price: "$94,9990",
    },
    {
      model: "Model S Plaid",
      Acceleration: "1.99 sec*",
      Range: "348 - 396 miles",
      TopSpeed: "200 mph",
      Drivetrain: "Tri Motor All-Wheel Drive",
      price: "$129,99",
    },
  ];
  const [model, setModel] = useState(rangeAndPerformance[0]);
  const [car, setCar] = useState(vehicle[0]);
  const [color, setColor] = useState(paint[0]);

  const [wheel, setWheel] = useState("Tempest Wheels");
  const wheels = [
    {
      name: "Arachnid Wheels",
      image: require("../../assets/images/models/Wheels/21Arachnid.png"),
    },
    {
      name: "Tempest Wheels",
      image: require("../../assets/images/models/Wheels/ui_swat_whl_tempest.png"),
    },
  ];
  return (
    <View >
      <FlatList
        data={car.images}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            style={{ width, height: height * 0.4, resizeMode: "cover" }}
            source={item}
          />
        )}
      />

      <View
        style={{
          flexDirection: "column",
          position: "absolute",
          top: 230,
          left: 20,
        }}
      >
        <Text
          style={{
            color: "#000",
            fontFamily: "Gotham-Rounded-Book",
            fontSize: 25,
          }}
        >
          {car.colorText}
        </Text>
        <Text
          style={{
            color: "#C62A2E",
            fontFamily: "Gotham-Rounded-Book",
            fontSize: 25,
          }}
        >
          {car.colorPrice}
        </Text>
      </View>

      <View style={styles.range2}>
        {paint.map((p) => (
          <TouchableOpacity
            onPress={() => {
              setColor(p);
              setCar(vehicle.find((v) => v.color === p && v.wheels === wheel));
            }}
            key={p.key}
          >
            <View
              style={{
                margin: 5,
                backgroundColor: p,
                width: 30,
                height: 30,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: color == p ? "#F29F05" : p,
              }}
            ></View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: "row", left:210 }}>
        {wheels.map((w) => (
          <TouchableOpacity
            onPress={() => {
              setWheel(w.name),
                setCar(
                  vehicle.find((v) => v.color === color && v.wheels === w.name)
                );
            }}
            key={w.name}
          >
            <Image
              transform={[{ scale: wheel == w.name ? 1.1 : 1 }]}
              style={{ width: 50, height: 50, margin: 8, resizeMode: "cover" }}
              source={w.image}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: "column", left:20 }}>
        <Text style={{ color: "#000", fontFamily: "Gotham-Rounded-Book" }}>
          {car.wheelsText}
        </Text>
        <Text style={{ color: "#000", fontFamily: "Gotham-Rounded-Book" }}>
          {car.wheelsPrice}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          bottom: -height*0.08,
          backgroundColor: "white",
          padding: 50,
          width,
          borderTopRightRadius:20,
          borderTopLeftRadius:20
        }}
      >
        <Text
          style={{
            paddingRight: 70,
            fontFamily: "Gotham-Medium",
            fontSize: 20,
            
          }}
        >
          {model.price}
        </Text>
        <TouchableOpacity
          style={styles.TouchableOpacitys}
          onPress={() => navigation.navigate("3. Interior")}
        >
          <Text style={styles.medium}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Interior({ navigation}) {
    const rangeAndPerformance = [
        {
          model: "Model S",
          Acceleration: "3.1 sec",
          Range: "375 - 405 miles",
          TopSpeed: "155 mph",
          Drivetrain: "Dual Motor All-Wheel Drive",
          price: "$94,9990",
        },
        {
          model: "Model S Plaid",
          Acceleration: "1.99 sec*",
          Range: "348 - 396 miles",
          TopSpeed: "200 mph",
          Drivetrain: "Tri Motor All-Wheel Drive",
          price: "$129,99",
        },
      ];

      const [model, setModel] = useState(rangeAndPerformance[0]);
      const [car, setCar] = useState(vehicle[0]);
      const [interiorColor, setInteriorColor] = useState(interior[0]);
    
      const [wheel, setWheel] = useState("Tempest Wheels");
      const wheels = [
        {
          name: "Arachnid Wheels",
          image: require("../../assets/images/models/Wheels/21Arachnid.png"),
        },
        {
          name: "Tempest Wheels",
          image: require("../../assets/images/models/Wheels/ui_swat_whl_tempest.png"),
        },
      ];
      return (
        <View >
          <FlatList
            data={interior}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                style={{ width, height: height * 0.4, resizeMode: "cover" }}
                source={item.images}
              />
            )}
          />

    

    
            <View style={{ flexDirection: "column", left:20, paddingTop:25 }}>
            <Text style={{ color: "#000", fontFamily: "Gotham-Light", fontSize: 20}}>
              {interiorColor.color}
            </Text>
            <Text style={{ color: "#000", fontFamily: "Gotham-Rounded-Book" }}>
              {interiorColor.price}
            </Text>
          </View>
        <View style={{ flexDirection: "row", left:20 }}>
        {interior.map((i) => (
          <TouchableOpacity
            onPress={() => {
              setInteriorColor(interior.find(c=>c.color==i.color))
            }}
            key={i.color}
          >
            <View
              style={{
                margin: 5,
                backgroundColor: i.colorCode,
                width: 40,
                height: 40,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: interiorColor.color == i.color ? "#F29F05" : i.colorCode,
              }}
            ></View>
          </TouchableOpacity>
        ))}
      </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              bottom: -height*0.08,
              backgroundColor: "white",
              padding: 50,
              width,
              borderTopRightRadius:20,
              borderTopLeftRadius:20
            }}
          >
            <Text
              style={{
                paddingRight: 70,
                fontFamily: "Gotham-Medium",
                fontSize: 20,
                
              }}
            >
              {model.price}
            </Text>
            <TouchableOpacity
              style={styles.TouchableOpacitys}
              onPress={() => navigation.navigate("3. Interior")}
            >
              <Text style={styles.medium}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}
function Autopilot({ navigation}) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const rangeAndPerformance = [
        {
          model: "Model S",
          Acceleration: "3.1 sec",
          Range: "375 - 405 miles",
          TopSpeed: "155 mph",
          Drivetrain: "Dual Motor All-Wheel Drive",
          price: "$94,9990",
        },
        {
          model: "Model S Plaid",
          Acceleration: "1.99 sec*",
          Range: "348 - 396 miles",
          TopSpeed: "200 mph",
          Drivetrain: "Tri Motor All-Wheel Drive",
          price: "$129,99",
        },
      ];
      const [model, setModel] = useState(rangeAndPerformance[0]);
      const [car, setCar] = useState(vehicle[0]);
      const [interiorColor, setInteriorColor] = useState(interior[0]);
      const videos=[
        require("../../assets/mp4/1.mp4"),
        require("../../assets/mp4/2.mp4"),
        require("../../assets/mp4/3.mp4"),
        require("../../assets/mp4/4.mp4"),
    ]

      return (
        <View           
>
          <FlatList
            data={videos}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.container}       
                  onPress={() =>
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                  }>
                <Video
                  ref={video}
                  style={styles.video}
                  source={item}
                  resizeMode="cover"
                  isLooping
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                />

              </View>
            )}
          />

    

    
            <View style={{ flexDirection: "column", left:20, paddingTop:25 }}>
            <Text style={{ color: "#000", fontFamily: "Gotham-Light", fontSize: 20}}>
            Full Self-Driving Capability
            </Text>
            <Text style={{ color: "#000", fontFamily: "Gotham-Rounded-Book" }}>
            $12,000
            </Text>
          </View>


          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              bottom: -height*0.08,
              backgroundColor: "white",
              padding: 50,
              width,
              borderTopRightRadius:20,
              borderTopLeftRadius:20
            }}
          >
            <Text
              style={{
                paddingRight: 70,
                fontFamily: "Gotham-Medium",
                fontSize: 20,
                
              }}
            >
              {model.price}
            </Text>
            <TouchableOpacity
              style={styles.TouchableOpacitys}
              onPress={() => navigation.navigate("3. Interior")}
            >
              <Text style={styles.medium}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}
const Tab = createMaterialTopTabNavigator();

export default function Details() {
  return (
    <Tab.Navigator>
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
    color: "#000",
    fontSize: 25,
    fontFamily: "Gotham-Black",
  },
  medium: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Gotham-Medium",
    fontSize: 20,
  },
  smallTitles: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Gotham-Medium",
  },
  properties: {
    flex: 2.5,
    alignItems: "center",
  },
  TouchableOpacitys: {
    borderColor: "#C62A2E",
    padding: 12,
    width: 150,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "transparent",
  },
  verticleLine: {
    height: 50,
    width: 0.5,
    backgroundColor: "#909090",
  },
  range1: {
    paddingTop: 10,
    position: "absolute",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    top: 220,
  },
  range2: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    left: 140,
    top: 270,
  },
  range: {
    paddingTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  acceleration: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 420,
    height: 300,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
