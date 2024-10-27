import useLocationStorage from "@/hook/useLocationStorage";
import { ILocationData, ITabs } from "@/types/index.type";
import { DEFAULT_LOCATION } from "@/utils/constant";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import "../location.css";
import { openAeonPayment } from "@/pages/AeonPaymentPage/components/AeonPaymentModal";
import { generateAeonResError } from "@/utils";

const MAPBOX_GEOCODING_URL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places";

const useLocationTracking = (
  mapContainerRef: React.RefObject<HTMLDivElement>,
  pkToken: string,
  setTab?: React.Dispatch<React.SetStateAction<ITabs>>
) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [zoom] = useState(12.12);
  const [locationData, setLocationData] = useState<ILocationData | undefined>();
  const currentLocationRef = useRef<mapboxgl.Marker | null>(null);
  const { markLocations, refresh } = useLocationStorage();
  const watchId = useRef<number | null>(null);
  const [mapLoading, setMapLoading] = useState(false); // State to manage loading

  const locationName = useMemo(() => {
    return locationData?.place_name || "Location not found";
  }, [locationData]);

  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const addMarkersToMap = () => {
    if (!mapRef.current || !markLocations) return;

    // Remove previous markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    // Loop through markLocations and add markers to the map
    Object.keys(markLocations).forEach((key) => {
      const { marks, color } = markLocations[key];
      const coordinates: [number, number][] = []; // Array to store coordinates for polyline
      marks.forEach(({ center: [longitude, latitude] }) => {
        // Create a custom marker element with the specified color
        coordinates.push([longitude, latitude]);
        const markerElement = document.createElement("div");
        markerElement.className = "mark-location-marker";
        markerElement.innerHTML = `
         <div style="display: flex; flex-direction: column; align-items: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <g fill="none">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
              <path fill="currentColor" d="M12 2a3 3 0 0 1 .866 5.873l-.17.046l2.427 2.775l1.824.911a1 1 0 0 1-.787 1.836l-.107-.047l-1.824-.912a2 2 0 0 1-.476-.332l-.135-.14l-1.018-1.163l-.66 2.638a2 2 0 0 1-.306.669l-.11.142l1.928 1.763a2 2 0 0 1 .544.83l.047.16l.738 2.951H15a1 1 0 0 1 .117 1.993L15 22h-.922a1.1 1.1 0 0 1-1.03-.714l-.037-.12l-.908-3.631l-3.01-2.752a2 2 0 0 1-1.067-2.105l.034-.163l.513-2.052l-.323.23l-1.393 2.322a1 1 0 0 1-1.769-.926l.054-.104l1.393-2.321a2 2 0 0 1 .423-.498l.13-.1L9.85 7.091A3 3 0 0 1 12 2M9.316 15.551a1 1 0 0 1 .633 1.265l-.426 1.276a2 2 0 0 1-.483.782l-1.657 1.657a1 1 0 0 1-1.59 1.176l-.493-.493a1.01 1.01 0 0 1 0-1.428l2.326-2.326l.425-1.276a1 1 0 0 1 1.265-.633"/>
            </g>
          </svg>
        </div>`;

        markerElement.style.backgroundColor = color; // Set marker color

        // Create and add marker to the map
        const marker = new mapboxgl.Marker({
          element: markerElement,
        })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current!);

        // Store the marker for future removal
        markersRef.current.push(marker);
      });
      console.log(markersRef);
      // Draw the line connecting the markers
      try {
        mapRef.current?.addSource(`line-source-${key}`, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates, // Use the coordinates array
            },
          },
        });

        mapRef.current?.addLayer({
          id: `line-layer-${key}`,
          type: "line",
          source: `line-source-${key}`,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "gray", // Use the same color for the line as the marker
            "line-width": 4,
            "line-dasharray": [2, 2],
          },
        });
      } catch (error) {}
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = pkToken;

    if (mapContainerRef?.current) {
      setMapLoading(true); // Set loading to false when the map has finished loading

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        zoom,
        style: "mapbox://styles/mapbox/outdoors-v12?optimize=true",
        center: DEFAULT_LOCATION as any, // Default center
        dragRotate: false, // Disable drag rotation
        trackResize: false, // Disable automatic resize tracking
        preserveDrawingBuffer: true, // May help with some rendering issues
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl());

      mapRef.current.on("load", () => {
        setMapLoading(false); // Set loading to false when the map has finished loading
      });

      // Get initial position
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (!mapRef.current) return;
          const { longitude, latitude } = position.coords;
          // const [longitude, latitude] = DEFAULT_LOCATION;

          mapRef.current.setCenter([longitude, latitude]);

          // Create the marker for current location
          const customMarkerElement = document.createElement("div");
          customMarkerElement.className = "current-location-marker";

          currentLocationRef.current = new mapboxgl.Marker({
            element: customMarkerElement,
            draggable: true,
          })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);

          // Update location name
          await updateLocationData(longitude, latitude);

          // Start watching the user's location
          watchId.current = navigator.geolocation.watchPosition(
            async (position) => {
              if (!mapRef.current) return;
              const { longitude, latitude } = position.coords;
              currentLocationRef.current?.setLngLat([longitude, latitude]);
              await updateLocationData(longitude, latitude);
            },
            () => {
              if (setTab) setTab("mdi:shopping-outline");
              openAeonPayment(
                generateAeonResError(
                  "Traeon location tracking is optimized for Mobile devices. For desktop users, please ensure that your browser supports location tracking features.",
                  "DEVICE_ERROR"
                )
              );
              console.error("Unable to access your location.");
            },
            { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
          );
        },
        async () => {
          openAeonPayment(
            generateAeonResError(
              "Traeon location tracking is optimized for Mobile devices. For desktop users, please ensure that your browser supports location tracking features.",
              "DEVICE_ERROR"
            )
          );
          await updateLocationData(DEFAULT_LOCATION[0], DEFAULT_LOCATION[1]);
          if (setTab) setTab("mdi:shopping-outline");
          console.error("Unable to access your location.");
        }
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

  useEffect(() => {
    addMarkersToMap();
  }, [markLocations]);

  const updateLocationData = async (longitude: number, latitude: number) => {
    try {
      const response = await axios.get(
        `${MAPBOX_GEOCODING_URL}/${longitude},${latitude}.json`,
        {
          params: {
            access_token: pkToken,
          },
        }
      );
      const placeData = response.data.features[0] as ILocationData;
      setLocationData(placeData);
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  return {
    zoom,
    locationData,
    locationName,
    updateLocationData,
    mapLoading,
    currentLocationRef,
    refresh,
  };
};

export default useLocationTracking;
