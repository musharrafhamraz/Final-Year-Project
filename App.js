import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImageClassifier from "./Screens/Diagnose_Screen";
import SplashScreen from "./Screens/Splash_Screen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"  
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiagnoseScreen"
          component={ImageClassifier}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

