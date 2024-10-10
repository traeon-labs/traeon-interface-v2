import { Iconify } from "@/components/iconify";
import {
  Button,
  Card,
  CardMedia,
  Chip,
  Grid2,
  Typography,
} from "@mui/material";
import { useCloudStorage } from "@tma.js/sdk-react";
import "mapbox-gl/dist/mapbox-gl.css";
import {TravelMapModal} from "./TravelMapModal";

export const TravelPage = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cloudData = useCloudStorage(false);
  const onResetData = async () => {
    const keys = await cloudData.getKeys();
    await cloudData.delete(keys);
  };
  return (
    <div>
      <h1>Strava-like Map</h1>
      <p>Total check-in Location: ... meters</p>

      <Grid2 container pb={2} spacing={3}>
        <Grid2 size={4}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ width: "100%" }}
            className="aeon-box-border aeon-box-shadow-bold aeon-transition"
            startIcon={<Iconify icon="entypo:location" />}
            // onClick={onCheckin}
          >
            Checkin
          </Button>
        </Grid2>
        <Grid2 size={4}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ width: "100%" }}
            className="aeon-box-border aeon-box-shadow-bold aeon-transition"
            // onClick={onResetData}
          >
            Reset
          </Button>
        </Grid2>
        <Grid2 size={4}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ width: "100%" }}
            className="aeon-box-border aeon-box-shadow-bold aeon-transition"
            onClick={() => {
              setVisible(true);
            }}
          >
            Your Journey
          </Button>
        </Grid2>
      </Grid2>
      
      <Grid2>
        <TravelMapModal
          visible={visible}
          setVisible={setVisible}
        />
      </Grid2>
    </div>
  );
};
