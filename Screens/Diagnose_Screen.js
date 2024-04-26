import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import treatmentData from '../assets/treatments.json';
import { useFonts } from 'expo-font';
import ImageCarousel from './ImageC';

const ImageClassifier = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [treatment, setTreatment] = useState("");
  const [Symptoms, setSymptoms] = useState("");
  const [fontsLoaded, fontError] = useFonts({
    'Merriweather-Bold': require('../assets/fonts/Merriweather-Bold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
  });



  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  const navigateToDiagnoseScreen = () => {
    navigation.navigate("DiagnoseScreen");
    setLabel('');
    setLoading(false);
  };

  const images = [
    require('../assets/images/pic1.jpg'),
    require('../assets/images/pic5.jpg'),
    require('../assets/images/pic3.jpg'),
  ]


  const handleCamera = async () => {
    setLoading(true);
    let result = await launchCameraAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setResult("");
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

    if (!result.canceled) {
      setResult("");
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
        extractTreatment(data.class);
      } else {
        setLabel("Failed to predict");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        Alert.alert('Server Error', 'Server Responded with Error\nPlease TRY AGAIN', [
          {
            text: 'Cancel',
            onPress: () => {navigateToDiagnoseScreen},
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {navigateToDiagnoseScreen}, },
        ]);
      } else if (error.request) {
        Alert.alert('Server Error', 'Please TRY AGAIN', [
          {
            text: 'Cancel',
            onPress: () => {navigateToDiagnoseScreen},
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {navigateToDiagnoseScreen}, },
        ]);
      } else {
        Alert.alert('Error', 'Please TRY AGAIN', [
          {
            text: 'Cancel',
            onPress: () => {navigateToDiagnoseScreen},
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {navigateToDiagnoseScreen}, },
        ]);
      }
    }
  };

  const extractTreatment = (predictedLabel) => {
    const foundDisease = treatmentData.find(disease => disease.disease_name === predictedLabel);
    const foundsymptoms = treatmentData.find(disease=> disease.disease_name === predictedLabel)
    if (foundDisease) {
      setTreatment(foundDisease.treatment);
      setSymptoms(foundsymptoms.symptoms)
    } else {
      setTreatment("Treatment not found"); 1
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      {loading && <View style={styles.overlay} />}
      <View style={styles.titleContainer}>
        <Text style={styles.title}><Text style={styles.titlename}>DTreaty</Text>{'\n'}Your Farming Assistant</Text>
      </View>

      {label ? (
        <View style={styles.resultContainer}>
          <TouchableOpacity style={styles.backButton} onPress={navigateToDiagnoseScreen}>
            <Ionicons name="arrow-back-sharp" size={34} color="white" />
          </TouchableOpacity>
          <Text style={styles.resultText}>Your Crop is affected by <Text style={styles.label}>{label}</Text> and I am <Text style={styles.confidencelabel}>{parseFloat(result * 100).toFixed(0) + "%"}</Text> Confident</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          
          <Text style={styles.resultText}>Symptoms</Text>
          <View style={styles.divider} />
          <Text style={styles.resultTextlong}>{Symptoms}</Text>
          <View style={styles.divider} />
          <Text style={styles.resultText}>Treatment</Text>
          <View style={styles.divider} />
          <Text style={styles.resultTextlong}>{treatment}</Text>

  
          </ScrollView>
          
            
          
        </View>
      ) : loading ? (
        <ActivityIndicator style={styles.indicator} size="large" color="#fff" />
      ) : (
        <View>
          <View style={{ flex: 0.9 }}>
              <ImageCarousel images={images} />
          </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleCamera}>
            <Ionicons name="camera" size={34} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleImageLibrary}>
            <Ionicons name="images" size={34} color="white" />
          </TouchableOpacity>
        </View>
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
  titleContainer: {
    height: 100,
    width: '95%',
    backgroundColor: '#267a11',
    borderRadius: 25,
    margin: 10,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row'
  },
  backButton:{
    width:'13%',
    marginBottom:15,
    backgroundColor:'#548054',
    padding: 5,
    borderRadius:50,
  },
  capturedImage: {
    width: '100%',
    height: 150
  },
  label: {
    color: 'red'
  },
  confidencelabel: {
    color: 'green'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#6b8a6b",
  },
  title: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontFamily: 'Merriweather-Bold'
  },
  titlename: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
  },
  resultContainer: {
    flex: 0.9,
    width: "95%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultTextlong:{
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  iconButton: {
    backgroundColor: "#267a11",
    padding: 20,
    borderRadius: 10,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  indicator: {
    flex: 1,
  }
});

export default ImageClassifier;
