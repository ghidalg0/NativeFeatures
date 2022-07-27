import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { OutlinedButton } from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/db";

export const PlaceDetails = ({route, navigation}) => {

  const [place, setPlace] = useState();

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: place.location.lat,
      initialLng: place.location.lng,
    });
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    // use selected place ID to fetch Data
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    };

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!place) {
    return <View style={styles.fallbackText}><Text>Loading place info...</Text></View>;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: place.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallbackText: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 16,
  },
});
