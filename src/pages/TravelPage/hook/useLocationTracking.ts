import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "../location.css"
const MAPBOX_GEOCODING_URL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places";

const useLocationTracking = (
  mapContainerRef: React.RefObject<HTMLDivElement>,
  pkToken: string
) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [zoom, setZoom] = useState(13.12);
  const [locationName, setLocationName] = useState<string>("");
  const currentLocationRef = useRef<mapboxgl.Marker | null>(null);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = pkToken;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        zoom: zoom,
        center: [-74.0242, 40.6941], // Default center
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl());

      mapRef.current.on("move", () => {
        setZoom(mapRef.current?.getZoom() || zoom);
      });

      // Get initial position
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (!mapRef.current) return;

          const { longitude, latitude } = position.coords;
          mapRef.current.setCenter([longitude, latitude]);

          // Create the marker
          const customMarkerElement = document.createElement("div");
          customMarkerElement.className = "current-location-marker";

          currentLocationRef.current = new mapboxgl.Marker({
            element:customMarkerElement,
            color: "red",
            draggable: true,
          })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);

          // Update location name
          await updateLocationName(longitude, latitude);

          // Start watching the user's location
          watchId.current = navigator.geolocation.watchPosition(
            async (position) => {
              if (!mapRef.current) return;
              const { longitude, latitude } = position.coords;
              currentLocationRef.current?.setLngLat([longitude, latitude]);
              await updateLocationName(longitude, latitude);
            },
            () => alert("Unable to access your location."),
            { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
          );
        },
        () => alert("Unable to access your location.")
      );
    }

    // Cleanup function
    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
      mapRef.current?.remove();
      currentLocationRef.current?.remove();
    };
  }, [mapContainerRef, pkToken]);

  const updateLocationName = async (longitude: number, latitude: number) => {
    try {
      const response = await axios.get(
        `${MAPBOX_GEOCODING_URL}/${longitude},${latitude}.json`,
        {
          params: {
            access_token: pkToken,
          },
        }
      );
      const placeName =
        response.data.features[0]?.place_name || "Location not found";
      setLocationName(placeName);
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  return { zoom, locationName, updateLocationName };
};

export default useLocationTracking;
