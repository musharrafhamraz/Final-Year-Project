import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const History = () => {
    const navigation = useNavigation();
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    getData();

  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        let parsedData;
        try {
          parsedData = JSON.parse(value);
        } catch (error) {
          console.error('Error parsing data:', error);
          return;
        }
        setSavedData(parsedData);
      }
    } catch (e) {
      console.error('Error reading data:', e);
    }
  };

  const clearData = async () => {
    try {
        Alert.alert("Delete", "Are You Sure!", [
            {
              text: "Yes",
              onPress: async () => {
                await AsyncStorage.clear();
                navigation.navigate("DiagnoseScreen");
              },
              style: "cancel",
            },
            {
              text: "No",
              onPress: () => {
                navigation.navigate('DiagnoseScreen');
              },
            },
          ]);
    //   await AsyncStorage.clear();
    //   navigation.navigate("DiagnoseScreen");
    } catch (error) {
        Alert.alert("Error", "Please GO BACK", [
            {
              text: "Cancel",
              onPress: () => {
                navigation.navigate('DiagnoseScreen');
              },
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                navigation.navigate('DiagnoseScreen');
              },
            },
          ]);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('DiseaseDetails', { disease: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Saved Diseases</Text>
        <TouchableOpacity onPress={clearData}>
          <Ionicons name="trash" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={savedData.reverse()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
          <View style={styles.itemContainer}>
            <Image
              source={{uri: item.image}}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text  numberOfLines={2} style={styles.symptoms}>Symptoms: {item.Symptoms}</Text>
              <Text  numberOfLines={2} style={styles.treatment}>Treatment: {item.treatment}</Text>
            </View>
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#267a11',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  symptoms: {
    fontSize: 16,
  },
  treatment: {
    fontSize: 16,
  },
});

export default History;