import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

const Drawer = createDrawerNavigator();
// https://dribbble.com/shots/7036184-Finance-App-Visual-Exploration/attachments/36347?mode=media
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2E55A0",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerStyle: {
            backgroundColor: "#F6F8FB",
            width: 240,
          },
          drawerActiveBackgroundColor: "rgba(197,197,197,0.2)",
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="My Portfolio" component={Portfolio} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

{/* <p float="left">
<img src="assets/screenshots/Screenshot_1637146337.png" width="30%" height="30%">
<img src="assets/screenshots/Screenshot_1637146386.png" width="30%" height="30%">
<img src="assets/screenshots/Screenshot_1637146414.png" width="30%" height="30%">
<img src="assets/screenshots/Screenshot_1637146420.png" width="30%" height="30%">
</p> */}