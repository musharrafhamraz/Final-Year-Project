import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import treatmentData from "../assets/treatments.json";
import { useFonts } from "expo-font";

const ImageClassifier = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState("");
  const [label, setLabel] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [treatment, setTreatment] = useState("");
  const [Symptoms, setSymptoms] = useState("");
  const [fontsLoaded, fontError] = useFonts({
    "Merriweather-Bold": require("../assets/fonts/Merriweather-Bold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  const navigateToDiagnoseScreen = () => {
    navigation.navigate("DiagnoseScreen");
    setLabel("");
    setLoading(false);
  };
  const naigatetoList = () => {
    navigation.navigate("HistoryScreen");
  };


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
      setImage(result.assets[0].uri);
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
      setImage(result.assets[0].uri);
    } else {
      setLoading(false);
    }
  };

  const getPrediction = async (result) => {
    try {
      if (!result || !result.assets[0].uri) {
        console.error("Invalid image data:", result);
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
        Alert.alert(
          "Server Error",
          "Server Responded with Error\nPlease TRY AGAIN",
          [
            {
              text: "Cancel",
              onPress: () => {
                navigateToDiagnoseScreen;
              },
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                navigateToDiagnoseScreen;
              },
            },
          ]
        );
      } else if (error.request) {
        Alert.alert("Server Error", "Please TRY AGAIN", [
          {
            text: "Cancel",
            onPress: () => {
              navigateToDiagnoseScreen;
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              navigateToDiagnoseScreen;
            },
          },
        ]);
      } else {
        Alert.alert("Error", "Please TRY AGAIN", [
          {
            text: "Cancel",
            onPress: () => {
              navigateToDiagnoseScreen;
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              navigateToDiagnoseScreen;
            },
          },
        ]);
      }
    }
  };

  const extractTreatment = (predictedLabel) => {
    const foundDisease = treatmentData.find(
      (disease) => disease.disease_name === predictedLabel
    );
    const foundsymptoms = treatmentData.find(
      (disease) => disease.disease_name === predictedLabel
    );
    if (foundDisease) {
      setTreatment(foundDisease.treatment);
      setSymptoms(foundsymptoms.symptoms);
    } else {
      setTreatment("Treatment not found");
    }
    storeData(predictedLabel, foundDisease.treatment, foundsymptoms.symptoms, image);
  };

  // The AsyncStorage Work.

  const storeData = async (predictedLabel, treatment, Symptoms, image) => {
    try {
      // Retrieve existing data
      const existingData = await AsyncStorage.getItem("my-key");
      let newData = [];

      if (existingData !== null) {
        // If existing data exists, parse it
        newData = JSON.parse(existingData);
      }

      // Append new data to existing data
      newData.push({
        name: predictedLabel,
        treatment: treatment || "",
        Symptoms: Symptoms || "",
        image: image,
      });

      // Store updated data
      await AsyncStorage.setItem("my-key", JSON.stringify(newData));
    } catch (e) {
      console.error("Error saving data:", e);
    }
  };

  // Ending work.....

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const DATA = [
    {
      id: "5",
      title: "Powdery Mildew",
      subtitle: "Powdery mildew appears as white powdery patches on leaves, stems, and flowers.",
      buttonTxt: "Details",
      img: require("../assets/images/powderyMildew.jpg"),
      details: "Powdery mildew is a fungal disease caused by various species of fungi in the order Erysiphales. It thrives in warm, humid conditions and can affect a wide range of plants including roses, cucumbers, squash, and lilacs. The white powdery patches typically develop on the upper surface of leaves, although they can also occur on stems and flowers. As the disease progresses, the affected leaves may become distorted and eventually die. Control measures include planting resistant varieties, ensuring good air circulation around plants, and applying fungicides if necessary."
    },
    {
      id: "2",
      title: "Leaf Spot",
      subtitle: "Leaf spot manifests as dark or discolored spots on leaves, often with a defined border.",
      buttonTxt: "Details",
      img: require("../assets/images/leaf-spot.jpg"),
      details: "Leaf spot is a common fungal disease caused by various species of fungi, including Alternaria, Septoria, and Cercospora. It often occurs during periods of high humidity and can affect a wide range of plants, including vegetables, ornamentals, and trees. Leaf spot typically appears as dark or discolored spots on leaves, which may have a defined border. In severe cases, the spots may coalesce, causing extensive leaf damage and defoliation. Control measures include removing and destroying infected plant material, practicing good garden hygiene, and applying fungicides as needed."
    },
    {
      id: "3",
      title: "Rust",
      subtitle: "Rust appears as orange, yellow, or brown powdery or pustular growths on leaves and stems.",
      buttonTxt: "Details",
      img: require("../assets/images/rust.jpg"),
      details: "Rust is a fungal disease caused by various species of fungi in the order Pucciniales. It affects a wide range of plants, including ornamentals, vegetables, and grains. Rust typically appears as orange, yellow, or brown powdery or pustular growths on leaves and stems. These growths contain masses of spores that can spread the disease to nearby plants. Rust infections can weaken plants, reduce yields, and affect the aesthetic appeal of ornamental plants. Control measures include planting resistant varieties, removing and destroying infected plant material, and applying fungicides if necessary."
    },
    {
      id: "4",
      title: "Anthracnose",
      subtitle: "Anthracnose causes dark, sunken lesions on leaves, stems, and fruits.",
      buttonTxt: "Details",
      img: require("../assets/images/anthredc.jpg"),
      details: "Anthracnose is a fungal disease caused by various species of fungi in the genus Colletotrichum. It affects a wide range of plants, including trees, shrubs, and vegetables. Anthracnose typically appears as dark, sunken lesions on leaves, stems, and fruits. These lesions may have a water-soaked appearance in wet conditions and can eventually lead to tissue death. Anthracnose infections can weaken plants, reduce yields, and affect the quality of fruits and vegetables. Control measures include practicing good garden hygiene, removing and destroying infected plant material, and applying fungicides as needed."
    },
    {
      id: "1",
      title: "Root Rot",
      subtitle: "Root rot results in rotting roots, often accompanied by wilting, yellowing, or stunted growth above ground.",
      buttonTxt: "Details",
      img: require("../assets/images/rootRot.jpg"),
      details: "Root rot is a common problem caused by various pathogens, including fungi, bacteria, and water molds. It affects a wide range of plants, including trees, shrubs, and vegetables. Root rot typically occurs in waterlogged or poorly drained soil, where oxygen levels are low and pathogens thrive. Symptoms of root rot include rotting roots, often with a foul odor, as well as wilting, yellowing, or stunted growth above ground. Control measures include improving soil drainage, avoiding overwatering, and planting resistant varieties. In severe cases, affected plants may need to be removed and replaced."
    }
  ];
  const handlediseaseCard = (event, item) => {
    navigation.navigate("DiseaseDetailsMain", {
      disease: item,
    });
  }

  const Item = ({ item }) => {

    return (
      <View style={styles.item}>
        <View style={styles.textContainer}>
          <Text style={styles.titleS}>{item.item?.title}</Text>
          <Text numberOfLines={2} style={styles.subtitleS}>{item.item?.subtitle}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={(event) => {
              event.persist(); // Persist the event
              handlediseaseCard(event, item);
            }}
          >
            <Text style={styles.buttonText}>{item.item?.buttonTxt}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={item.item?.img}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <View style={styles.overlay} />}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          <Text style={styles.titlename}>DTreaty</Text>
          {"\n"}Your Farming Assistant
        </Text>
        <TouchableOpacity style={styles.iconButton} onPress={naigatetoList}>
          <Ionicons name="list" size={34} color="white" />
        </TouchableOpacity>
      </View>

      {label ? (
        <View style={styles.resultContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={navigateToDiagnoseScreen}
          >
            <Ionicons name="arrow-back-sharp" size={34} color="white" />
          </TouchableOpacity>
          <Text style={styles.resultText}>
            Your Crop is affected by <Text style={styles.label}>{label}</Text>{" "}
            and I am{" "}
            <Text style={styles.confidencelabel}>
              {parseFloat(result * 100).toFixed(0) + "%"}
            </Text>{" "}
            Confident
          </Text>
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
          <View style={{ flex: 0.91 }}>
            <Text style={styles.commonDisease}>Common Diseases</Text>
            <View style={styles.MainSlider}>
              <FlatList
                data={DATA}
                horizontal
                renderItem={(item) => <Item item={item} />}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Text style={styles.commonDisease}>Others</Text>
            <View style={styles.Gridcontainercontainer}>
              <View style={styles.row}>
                
                  <TouchableOpacity style={styles.item1}>
                    <Ionicons name="list" size={45}/>
                    <Text>Scan</Text>
                  </TouchableOpacity>
          
                <TouchableOpacity style={styles.item1}>
                    <Ionicons name="list" size={45} />
                    <Text>Scan</Text>
                  </TouchableOpacity>
                
              </View>
              <View style={styles.row}>
              <TouchableOpacity style={styles.item1}>
                    <Ionicons name="list" size={45}/>
                    <Text>Scan</Text>
                  </TouchableOpacity>
          
                <TouchableOpacity style={styles.item1}>
                  <ImageBackground 
                    source={require('../assets/images/leaf-spot.jpg')}
                  >
                    <Ionicons name="list" size={45} />
                    <Text>Scan</Text>
                    </ImageBackground>
                  </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.MainSlider}>
            <FlatList
              data={DATA}
              horizontal
              renderItem={(item) => <Item item={item} />}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View> */}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={handleCamera}>
              <Ionicons name="camera" size={34} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleImageLibrary}
            >
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    height: 80,
    width: "100%",
    backgroundColor: "#267a11",
    marginBottom: 13,
    paddingLeft: 30,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  backButton: {
    width: "13%",
    marginBottom: 15,
    backgroundColor: "#548054",
    padding: 5,
    borderRadius: 50,
  },
  commonDisease: {
    fontSize: 20,
    color: "black",
    marginHorizontal: 16,
    marginVertical: 8,
    fontFamily: "Merriweather-Bold",
  },
  capturedImage: {
    width: "100%",
    height: 150,
  },
  label: {
    color: "red",
  },
  confidencelabel: {
    color: "green",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#6b8a6b",
  },
  title: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontFamily: "Merriweather-Bold",
  },
  titlename: {
    fontFamily: "Montserrat-Bold",
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
  resultTextlong: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  iconButton: {
    backgroundColor: "#267a11",
    padding: 20,
    borderRadius: 10,
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  indicator: {
    flex: 1,
  },

  // Item List styling
  item: {
    backgroundColor: "#E6E6E6",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    height: 190,
    width: 358,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 20,
  },
  titleS: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitleS: {
    fontSize: 14,
    color: '#666',
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: "#4DB129",
    width: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // End..
  Gridcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  item1: {
    width: 150,
    height: 130,
    backgroundColor: '#E6E6E6',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  imageBackground:{
    flex:1,
    alignItems: 'center',
    
  }
});

export default ImageClassifier;
