import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/Home_Screen";
import ImageClassifier from "./Screens/Diagnose_Screen";
import DiseaseScreen from "./Screens/Disease_Screen";
import SplashScreen from "./Screens/Splash_Screen";
import TreatmentScreen from "./Screens/Treatment_Screen";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TreatmentScreen">
        <Stack.Screen
          name="SplashScreen"  
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"  
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiagnoseScreen"
          component={ImageClassifier}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DiseaseScreen"
          component={DiseaseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TreatmentScreen"
          component={TreatmentScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

