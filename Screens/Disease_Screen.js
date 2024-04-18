import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DiseaseScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./tomato.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
        <Text style={styles.heading}>Tomato Late Blight</Text>

      <ScrollView style={styles.content} >

        <View>
          <Text style={styles.sectionHeading}>Symptoms</Text>
          <Text style={styles.description}>
            This is the first portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
          </Text>
          <View style={styles.divider} />
        </View>

        <View>
          <Text style={styles.sectionHeading}>Treatment</Text>
          <Text style={styles.description}>
            This is the second portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
            This is the second portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
            This is the second portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
            This is the second portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
            This is the second portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
          </Text>
          <View style={styles.divider} />
        </View>

        <View>
          <Text style={styles.sectionHeading}>Treatment Desi</Text>
          <Text style={styles.description}>
            This is the third portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
            This is the third portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
            This is the third portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
            This is the third portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
            This is the third portion of the description text. It can be as
            long as you want and will wrap accordingly. Make sure to replace
            this with your actual description.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 0,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200, // Adjust this as per your image aspect ratio
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default DiseaseScreen;
