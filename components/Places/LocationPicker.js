import { View, StyleSheet, Alert, Image, Text } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";

import { OutlinedButton } from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import { getMapPreview } from "../../util/location";
import { useNavigation } from "@react-navigation/native";

export const LocationPicker = () => {

  const navigation = useNavigation();

  const [locPermissionInfo, requestPermission] = useForegroundPermissions();

  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {

    if (locPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted; // boolean
    }
    if (locPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert("Location Blocked", "You need to grant location permission");
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No location picked yet...</Text>;

  if (pickedLocation) {
    locationPreview = <Image source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} style={styles.image}/>;
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
