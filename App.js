import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { Button } from 'react-native';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen
          name="My Portfolio"
          component={Portfolio}
/*           options={{
            headerRight: () => (
              <IconButton
                icon="plus"
                size={28}
                onPress={() => console.log("Pressed")}
              />
            ),
          }} */
        />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


