import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to another screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('HomeScreen'); // Replace 'Home' with the name of your destination screen
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer when component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./farmer.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.heading}>DTREATY</Text>
      <Text style={styles.description}>
        Empowering Farmers, Nurturing Crops: Dtreaty - Your Companion in Crop Health, Detecting Diseases, and Prescribing    Vital Treatments for Bountiful Harvests.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing:2,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight:25,
    letterSpacing:2,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SplashScreen;

// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const SplashScreen = ({ navigation }) => {
//   const navigateToNextScreen = () => {
//     navigation.replace('Home'); // Replace 'Home' with the name of your destination screen
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('./farmer.png')}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <Text style={styles.heading}>DTREATY</Text>
//       <Text style={styles.description}>
//       Empowering Farmers, Nurturing Crops: Dtreaty - Your Companion in Crop Health, Detecting Diseases, and Prescribing Vital Treatments for Bountiful Harvests.
//       </Text>
//       <TouchableOpacity style={styles.button} onPress={navigateToNextScreen}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   image: {
//     width: 400,
//     height: 400,
//     marginBottom: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     letterSpacing:2,
//   },
//   description: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//     lineHeight:25,
//     letterSpacing:2,
//     fontWeight:'bold'
//   },
//   button: {
//     backgroundColor: 'blue',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

// export default SplashScreen;
