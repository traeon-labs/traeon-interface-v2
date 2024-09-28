import { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import useLocationTracking from "./hook/useLocationTracking";
import { useCloudStorage } from "@tma.js/sdk-react";
import { Button, Grid2 } from "@mui/material";
import { Iconify } from "@/components/iconify";

export const TravelPage = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const PK_TOKEN =
    "pk.eyJ1IjoiYXZpbmNlbnRhIiwiYSI6ImNtMWxsMGJicDBhNjcycG85OWZ5Znd5d2UifQ.krV7qPCTyTtHq53LoSjwQg";

  // Use the custom hook
  const { zoom, locationName } = useLocationTracking(mapContainerRef, PK_TOKEN);
  const { getKeys, set, get } = useCloudStorage();
  const onCheckin = async () => {
    console.log()
    alert(locationName + '')
    // await set('','')
  }
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
            sx={{ width: '100%' }}
            className="aeon-box-border aeon-box-shadow-bold aeon-transition"
            startIcon={<Iconify icon="entypo:location" />}
            onClick={onCheckin}
          >
            Checkin
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
