// utils/getCurrentLocation.ts
import * as Location from 'expo-location';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getCurrentLocation = async (): Promise<Coordinates> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }

  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};
