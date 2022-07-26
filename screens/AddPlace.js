import { PlaceForm } from "../components/Places/PlaceForm";

export const AddPlace = ({navigation}) => {

  const createPlaceHandler = (place) => {
    navigation.navigate('AllPlaces', {
      place: place,
    });
  };

  return (
    <PlaceForm onCreatePlace={createPlaceHandler}/>
  );

}
