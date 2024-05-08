import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const DiseaseDetailsScreen = ({ route }) => {
  const { disease } = route.params;

  return (
    <View style={styles.container}>
        <Image
        source={{uri: disease.image}}
        style={{
            height:'30%',
            width:"100%",
            marginBottom:17
        }}
        />
      <Text style={styles.heading}>{disease.name}</Text>
      <ScrollView>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Symptoms:</Text>
        <Text style={styles.text}>{disease.Symptoms}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Treatment:</Text>
        <Text style={styles.text}>{disease.treatment}</Text>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 20,
    paddingHorizontal:30
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  text: {
    fontSize: 18,
    color: '#444',
  },
});

export default DiseaseDetailsScreen;
