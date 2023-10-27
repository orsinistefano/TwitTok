import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

export default function Map({ route }) {
  const [latitude, setLat] = useState(route.params.latitude);
  const [longitude, setLon] = useState(route.params.longitude);

  let initialRegion;
  if (latitude === null || longitude === null) {
    initialRegion = {
      latitude: 45.464211,
      longitude: 9.189982,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  } else {
    initialRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  return (
    <MapView
      style={styles.map }
      initialRegion={initialRegion}
      mapType="standard"
      zoomControlEnabled
    >
      <Marker coordinate={initialRegion} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
