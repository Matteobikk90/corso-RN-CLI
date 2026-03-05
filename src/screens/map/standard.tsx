import { ActivityIndicator, View } from 'react-native';
import { useGeolocation } from '../../hooks/use-geolocation';

export function StandardMapScreen() {
  const { loading } = useGeolocation();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* <MapView
        className="flex-1"
        initialRegion={{
          latitude: location?.latitude ?? 45,
          longitude: location?.longitude ?? 10,
          longitudeDelta: 0.05,
          latitudeDelta: 0.05,
        }}
      >
        <UrlTile urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {location && (
          <Marker
            coordinate={location}
            title="Sei qui"
            description={`${location.latitude.toFixed(
              3,
            )}, ${location.longitude.toFixed(3)}`}
            pinColor="#6366f1"
          />
        )}
      </MapView> */}
    </View>
  );
}
