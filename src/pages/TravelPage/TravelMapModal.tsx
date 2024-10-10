import { Iconify } from "@/components/iconify";
import { ILocationStore } from "@/types/index.type";
import { encodeLocationKey } from "@/utils";
import { DEFAULT_LOCATION } from "@/utils/constant";
import { Button, Grid2 } from "@mui/material";
import { useCloudStorage } from "@tma.js/sdk-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef } from "react";
import useLocationTracking from "./hook/useLocationTracking";
import { Modal } from "@telegram-apps/telegram-ui";

export const TravelMapModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const PK_TOKEN =
    "pk.eyJ1IjoiYXZpbmNlbnRhIiwiYSI6ImNtMWxsMGJicDBhNjcycG85OWZ5Znd5d2UifQ.krV7qPCTyTtHq53LoSjwQg";

  // Use the custom hook
  const {
    zoom,
    locationData,
    locationName,
    currentLocationRef,
    refresh,
    updateLocationData,
  } = useLocationTracking(mapContainerRef, PK_TOKEN);
  const cloudData = useCloudStorage(false);
  const onCheckinWithMap = async () => {
    const contextLength = locationData?.context.length || 2;
    const region = locationData?.context?.[contextLength - 2]?.text;
    const country = locationData?.context?.[contextLength - 1]?.text;
    const locationKeyHash = encodeLocationKey(country, region);

    const locationStorageData: ILocationStore = JSON.parse(
      (await cloudData.get(locationKeyHash)) || "{}"
    );
    if (locationData?.id) {
      locationStorageData[locationData?.id] = {
        place_name: locationData?.place_name,
        center: locationData.center,
      };
      await cloudData.set(locationKeyHash, JSON.stringify(locationStorageData));
    }
    setTimeout(async () => {
      await refresh();
    }, 1000);
  };
  return (
      <div
        id="map-container"
        style={{ width: "100%", height: "100vh", background: "gray" }}
        ref={mapContainerRef}
      />
  );
};
