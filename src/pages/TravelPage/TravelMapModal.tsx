import { ILocationStore } from "@/types/index.type";
import { encodeLocationKey } from "@/utils";
import { Button, Grid, Grid2 } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import useLocationTracking from "./hook/useLocationTracking";
import { Iconify } from "@/components/iconify";
import { cloudStorage as cloudData } from "@telegram-apps/sdk";
import {LineMdMapMarkerRadius} from "./Components/LineMdMapMarkerRadius";

export const TravelMapModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapRef, setMapRef] = useState<
    React.MutableRefObject<HTMLDivElement | null>
  >({ current: null });
  const PK_TOKEN =
    "pk.eyJ1IjoiYXZpbmNlbnRhIiwiYSI6ImNtMWxsMGJicDBhNjcycG85OWZ5Znd5d2UifQ.krV7qPCTyTtHq53LoSjwQg";

  const {
    zoom,
    locationData,
    locationName,
    currentLocationRef,
    refresh,
    mapLoading,
    updateLocationData,
  } = useLocationTracking(mapContainerRef, PK_TOKEN);
  const onCheckinWithMap = async () => {
    const contextLength = locationData?.context.length || 2;
    const region = locationData?.context?.[contextLength - 2]?.text;
    const country = locationData?.context?.[contextLength - 1]?.text;
    const locationKeyHash = encodeLocationKey(country, region);
    const locationStorageData: ILocationStore = JSON.parse(
      (await cloudData.getItem(locationKeyHash)) || "{}"
    );
    console.log(locationData);
    if (locationData?.id) {
      locationStorageData[locationData?.id] = {
        place_name: locationData?.place_name,
        center: locationData.center,
      };
      console.log("add", locationKeyHash, JSON.stringify(locationStorageData));
      await cloudData.setItem(
        locationKeyHash,
        JSON.stringify(locationStorageData)
      );
      console.log("Done", locationKeyHash, JSON.stringify(locationStorageData));
    }
    setTimeout(async () => {
      await refresh();
    }, 1000);
  };
  return (
    <div style={!visible ? { opacity: 0 } : {}}>
      <Grid2
        container
        // p={1}
        spacing={1}
        className="aeon-box-border aeon-box-shadow-bold aeon-transition"
        sx={{
          position: "fixed",
          zIndex: 1,
          bottom: "50px",
          background: "white",
          width: "40%",
          left: "30%",
          borderRadius: "20px",
        }}
      >
        <Grid2 size={12}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ width: "100%", height: '50px' }}
            className="aeon-box-border aeon-box-shadow-bold aeon-transition"
            startIcon={<Iconify icon="entypo:location" />}
            onClick={async () => {
              await refresh()
              onCheckinWithMap();
            }}
          >
            Checkin
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={1} sx={{ height: "100vh" }}>
        <div
          id="map-container"
          style={{
            width: "100%",
            transition: "0.4s",
            background: "white",
            ...(!visible
              ? {
                  visibility: "hidden",
                  opacity: 0,
                }
              : {
                  opacity: 1,
                  visibility: "visible",
                }),
          }}
          ref={mapContainerRef}
        />
      </Grid2>
    </div>
  );
};
