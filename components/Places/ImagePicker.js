import { Alert, Button, StyleSheet, View, Image, Text } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { useState } from "react";
import { Colors } from "../../constants/colors";

export const ImagePicker = () => {

  const [camPermissionInfo, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    if (camPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted; // boolean
    }
    if (camPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert("Camera Blocked", "You did not granted access to camera");
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {

    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
  };

  let imagePreview = <Text>No Image taken yet...</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{uri: pickedImage}} style={styles.image}/>;
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
