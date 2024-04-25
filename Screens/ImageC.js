import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const ImageCarousel = ({ images }) => {
  const renderImage = ({ item }) => (
    <Image source={item} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
  );

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        data={images}
        renderItem={renderImage}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        loop={true}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={3000}
      />
    </View>
  );
};

export default ImageCarousel;
