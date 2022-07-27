import { PlaceForm } from "../components/Places/PlaceForm";
import { insertPlace } from "../util/db";

export const AddPlace = ({navigation}) => {

  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces', {
      place: place,
    });
  };

  return (
    <PlaceForm onCreatePlace={createPlaceHandler}/>
  );

}
