import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import { Button } from "../ui/Button";
import { ImagePicker } from "./ImagePicker";
import { LocationPicker } from "./LocationPicker";


export const PlaceForm = ({onCreatePlace}) => {

  const [enteredTitle, setEnteredTitle] = useState();

  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText)
  };

  const imageTakenHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput onChangeText={changeTitleHandler} value={enteredTitle} style={styles.input}/>
      </View>
      <ImagePicker onTakeImage={imageTakenHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderTopStartRadius: 8,
    borderTopEndRadius: 4,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 4,
  },
});
