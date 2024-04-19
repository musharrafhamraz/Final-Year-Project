// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Platform,
//   Dimensions,
//   ImageBackground,
//   StatusBar,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";

// const { height, width } = Dimensions.get("window");

// const ImageClassifier = () => {

//   const navigation = useNavigation();
//   const [result, setResult] = useState("");
//   const [label, setLabel] = useState("");

//   useEffect(() => {
//     StatusBar.setBarStyle("light-content");
//   }, []);

//   const handleCamera = async () => {
//     let result = await launchCameraAsync({
//       mediaTypes: "Images",
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setResult("");
//       setLabel("Predicting...");
//       getPrediction(result);
//     }
//   };

//   const handleImageLibrary = async () => {
//     let result = await launchImageLibraryAsync({
//       mediaTypes: "Images",
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setResult("");
//       setLabel("Predicting...");
//       getPrediction(result);
//     }
//   };

//   const getPrediction = async (result) => {
//     try {
//       if (!result || !result.assets[0].uri) {
//         console.error('Invalid image data:', result);
//         return;
//       }
//       const uriParts = result.assets[0].uri.split("/");
//       const fileName = uriParts[uriParts.length - 1];

//       const formData = new FormData();
//       formData.append("file", {
//         uri: result.assets[0].uri,
//         type: "image/jpeg",
//         name: fileName,
//       });

//       const response = await axios.post(
//         "https://cnn-model-api-deployment-ac2b40fcf26d.herokuapp.com/predict1",
//         formData,
//         {
//           headers: {
//             accept: "application/json",
//             "Content-Type": "multipart/form-data",
//             "access-control-allow-credentials": true,
//           },
//         }
//       );

//       const { data } = response;

//       if (data && data.class) {
//         setLabel(data.class);
//         setResult(data.confidence);
//       } else {
//         setLabel("Failed to predict");
//       }
//     } catch (error) {
//       if (error.response) {
//         // console.error("Server responded with error:", error.response.data);
//         Alert.alert('Server Error', 'Server Responded with Error\nPlease TRY AGAIN', [
//           {
//             text: 'Cancel',
//             onPress: () => navigation.navigate("DiagnoseScreen"),
//             style: 'cancel',
//           },
//           {text: 'OK', onPress: () => navigation.navigate("HomeScreen"),},
//         ]);
//       } else if (error.request) {
//         // console.error("No response received:", error.request);
//         Alert.alert('Server Error', 'Please TRY AGAIN', [
//           {
//             text: 'Cancel',
//             onPress: () => navigation.navigate("DiagnoseScreen"),
//             style: 'cancel',
//           },
//           {text: 'OK', onPress: () => navigation.navigate("HomeScreen"),},
//         ]);
//       } else {
//         // console.error("Error:", error.message);
//         Alert.alert('Error', 'Please TRY AGAIN', [
//           {
//             text: 'Cancel',
//             onPress: () => navigation.navigate("DiagnoseScreen"),
//             style: 'cancel',
//           },
//           {text: 'OK', onPress: () => navigation.navigate("HomeScreen"),},
//         ]);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//     <ImageBackground
//       source={require('./farmer.png')}
//       style={styles.backgroundImage}
//     />
//     <Text style={styles.title}>Potato Disease Prediction App</Text>
//     {label ? (
//       <View style={styles.resultContainer}>
//         <Text style={styles.resultText}>Label: {label}</Text>
//         <Text style={styles.resultText}>
//           Confidence: {parseFloat(result).toFixed(2) + "%"}
//         </Text>
//       </View>
//     ) : (
//       <ActivityIndicator size="large" color="#0000ff" />
//     )}
//     <View style={styles.buttonContainer}>
//       <TouchableOpacity style={styles.iconButton} onPress={handleCamera}>
//         <Ionicons name="camera" size={24} color="white" />
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.iconButton}
//         onPress={handleImageLibrary}
//       >
//         <Ionicons name="images" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   </View>
  
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   backgroundImage: {
//     position: "absolute",
//     width: 800,
//     height: 800,
//     // zIndex: 0,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//     marginTop: 40,
//   },
//   image: {
//     width: width - 40,
//     height: width - 40,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   resultContainer: {
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   resultText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     marginBottom: 20,
//   },
//   iconButton: {
//     backgroundColor: "#007bff",
//     padding: 20,
//     borderRadius: 5,
//   },
// });

// export default ImageClassifier;


import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ImageClassifier = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  const handleCamera = async () => {
    setLoading(true);
    let result = await launchCameraAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setResult("");
      // setLabel("Predicting...");
      getPrediction(result);
    } else {
      setLoading(false);
    }
  };

 
  const handleImageLibrary = async () => {
    setLoading(true);
    let result = await launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setResult("");
      // setLabel("Predicting...");
      getPrediction(result);
    } else {
      setLoading(false);
    }
  };

  const getPrediction = async (result) => {
    try {
      if (!result || !result.assets[0].uri) {
        console.error('Invalid image data:', result);
        return;
      }
      const uriParts = result.assets[0].uri.split("/");
      const fileName = uriParts[uriParts.length - 1];

      const formData = new FormData();
      formData.append("file", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: fileName,
      });

      const response = await axios.post(
        "https://cnn-model-api-deployment-ac2b40fcf26d.herokuapp.com/predict",
        formData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            "access-control-allow-credentials": true,
          },
        }
      );

      const { data } = response;

      if (data && data.class) {
        setLabel(data.class);
        setResult(data.confidence);
      } else {
        setLabel("Failed to predict");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // console.error("Server responded with error:", error.response.data);
        Alert.alert('Server Error', 'Server Responded with Error\nPlease TRY AGAIN', [
          {
            text: 'Cancel',
            onPress: () => navigation.navigate("DiagnoseScreen"),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate("HomeScreen"),},
        ]);
      } else if (error.request) {
        // console.error("No response received:", error.request);
        Alert.alert('Server Error', 'Please TRY AGAIN', [
          {
            text: 'Cancel',
            onPress: () => navigation.navigate("DiagnoseScreen"),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate("HomeScreen"),},
        ]);
      } else {
        // console.error("Error:", error.message);
        Alert.alert('Error', 'Please TRY AGAIN', [
          {
            text: 'Cancel',
            onPress: () => navigation.navigate("DiagnoseScreen"),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate("HomeScreen"),},
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require('./farmer.png')}
        style={styles.backgroundImage}
      /> */}
      {loading && <View style={styles.overlay} />}
      <Text style={styles.title}>Potato Disease Prediction App</Text>
      {label ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Your Crop is affected by <Text style={styles.label}>{label}</Text> and I am <Text style={styles.confidencelabel}>{parseFloat(result*100).toFixed(0) + "%"}</Text> Confident</Text>
          {/* <Text style={styles.resultText}>
            {parseFloat(result*100).toFixed(0) + "%"}
          </Text> */}
        </View>
      ) : loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleCamera}>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleImageLibrary}
          >
            <Ionicons name="images" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  capturedImage: {
    width: '100%',
    height: 150
  },
  label:{
    color:'red'
  },
  confidencelabel:{
    color:'green'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 40,
  },
  resultContainer: {
    flex: 0.9,
    width: "85%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 20,
    paddingVertical:20,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: "#007bff",
    padding: 20,
    borderRadius: 5,
  },
});

export default ImageClassifier;
