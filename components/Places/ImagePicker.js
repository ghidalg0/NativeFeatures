import { Alert, Button, StyleSheet, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'

export const ImagePicker = () => {

  const [camPermissionInfo, requestPermission] = useCameraPermissions();

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
    console.log(image);
  };

  return (
    <View>
      <View>

      </View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});
