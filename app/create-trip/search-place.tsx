import { Colors } from "@/constants/Colors";
import { CreateTripContext } from "@/context/CreateTripContext";
import { useNavigation, useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import GooglePlacesTextInput, {
  Place,
} from "react-native-google-places-textinput";
const SearchPlace = () => {
  const navigation = useNavigation();
  const router = useRouter()
  const { tripData, setTripData } = useContext(CreateTripContext);
  // const context = useContext(CreateTripContext);
  // if (!context) {
  //   throw new Error("CreateTripContext.Provider is missing.");
  // }
  // const  tripData, setTripData } = context;

  const handlePlaceSelect = (place: Place) => {
    const details = place.details;
    // console.log("Address:", details?.formattedAddress);
    // console.log("Location:", details?.location);
    // console.log("Photo:", details?.photos[0].googleMapsUri);
    // console.log("Map URL:", details?.googleMapsUri);

    setTripData({
      locationInfo: {
        name: details?.formattedAddress,
        coordinates: details?.location,
        photoUri: details?.photos[0].googleMapsUri,
        googleMapsUri: details?.googleMapsUri,
      },
    });

    router.push("/create-trip/select-traveler");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  });

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 100,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <GooglePlacesTextInput
        apiKey={process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY as string}
        onPlaceSelect={handlePlaceSelect}
        placeHolderText="Search place"
        fetchDetails={true}
        detailsFields={[
          "formattedAddress",
          "location",
          "googleMapsUri",
          "photos",
        ]}
        style={{
          container: {
            marginTop: 25,
          },
          input: {
            borderWidth: 1,
            borderRadius: 5,
            fontFamily: "outfit",
          },
          suggestionText: {
            main: {
              fontFamily: "outfit",
              color: Colors.PRIMARY,
            },
            secondary: {
              fontFamily: "outift",
              color: Colors.GRAY,
            },
          },
        }}
      />
    </View>
  );
};

export default SearchPlace;
