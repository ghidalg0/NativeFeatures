import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PlacesList } from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/db";

export const AllPlaces = ({ route }) => {

  const isFocused = useIsFocused();

  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places)
    }

    if (isFocused) {
      // setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
      loadPlaces();
    }

  }, [isFocused]);

  return (
    <PlacesList places={loadedPlaces}/>
  );
};

// const styles = StyleSheet.create({

// });
