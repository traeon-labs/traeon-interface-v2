import {Iconify} from "@/components/iconify";
import {ILocationStore} from "@/types/index.type";
import {encodeLocationKey} from "@/utils";
import {DEFAULT_LOCATION} from "@/utils/constant";
import {Button,Grid2} from "@mui/material";
import {useCloudStorage} from "@tma.js/sdk-react";
import "mapbox-gl/dist/mapbox-gl.css";
import {useRef} from "react";
import useLocationTracking from "./hook/useLocationTracking";

export const TravelPage = () => {
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
  const onCheckin = async () => {
    console.log(locationData);
    const contextLength = locationData?.context.length || 2;
    const region = locationData?.context?.[contextLength - 2]?.text;
    const country = locationData?.context?.[contextLength - 1]?.text;
    const locationKeyHash = encodeLocationKey(country, region);

    const locationStorageData: ILocationStore = JSON.parse(
      (await cloudData.get(locationKeyHash)) || "{}"
    );
    console.log(locationStorageData);
    // country, region, postcode, district, place, locality, neighborhood, address
    if (locationData?.id) {
      locationStorageData[locationData?.id] = {
        place_name: locationData?.place_name,
        center: locationData.center,
      };
      await cloudData.set(locationKeyHash, JSON.stringify(locationStorageData));
    }
    setTimeout(async () => {
        await refresh()
    },1000)
  };
  const onResetData = async () => {
    const keys = await cloudData.getKeys();
    await cloudData.delete(keys);
  };
  return (
    <div>
      <h1>Strava-like Map</h1>
      <p>Total check-in Location: ... meters</p>
      <p>Current Location: {locationName}</p>
      <Grid2 container pb={2}>
        <Grid2 size={12}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ width: "100%" }}
            className="aeon-box-border aeon-box-shadow-bold aeon-transition"
            startIcon={<Iconify icon="entypo:location" />}
            onClick={onCheckin}
          >
            Checkin
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ width: "100%", paddingTop: "1rem" }}
            className="aeon-box-border aeon-box-shadow-bold aeon-transition"
            onClick={onResetData}
          >
            Reset
          </Button>
        </Grid2>
      </Grid2>

      <div
        id="map-container"
        style={{ width: "100%", height: "100vh", background: "gray" }}
        ref={mapContainerRef}
      />
    </div>
  );
};
