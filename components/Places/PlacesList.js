import { FlatList, View } from "react-native";

export const PlacesList = ({places}) => {

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={}
    />
  );
};
