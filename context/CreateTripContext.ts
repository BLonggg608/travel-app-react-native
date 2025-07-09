import { createContext, Dispatch, SetStateAction } from "react";

interface TripData {
  locationInfo: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    photoUri: string;
    googleMapsUri: string;
  };
}

interface CreateTripContextType {
  tripData: TripData[];
  setTripData: Dispatch<SetStateAction<any[]>>;
}

export const CreateTripContext = createContext<
  CreateTripContextType | undefined
>(undefined);
