import { View, StyleSheet, Alert } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";

import { OutlinedButton } from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";

export const LocationPicker = () => {
  const [locPermissionInfo, requestPermission] = useForegroundPermissions();

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
    console.log(location);
  };

  const pickOnMapHandler = () => {};

  return (
    <View>
      <View style={styles.mapPreview}>

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
});
