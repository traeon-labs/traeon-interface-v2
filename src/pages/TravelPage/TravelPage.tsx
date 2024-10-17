import { Iconify } from "@/components/iconify";
import {
  Button,
  Card,
  CardMedia,
  Chip,
  Grid2,
  Typography,
} from "@mui/material";
import { cloudStorage as cloudData } from "@telegram-apps/sdk";
import "mapbox-gl/dist/mapbox-gl.css";
import { TravelMapModal } from "./TravelMapModal";
import useLocationStorage from "@/hook/useLocationStorage";
import { useEffect } from "react";

export const TravelPage = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onResetData = async () => {
    const keys = await cloudData.getKeys();
    await cloudData.deleteItem(keys);
  };
  const { journeyKeys, locationLoading, journeysData, markLocations, refresh } =
    useLocationStorage();
  useEffect(() => {
    refresh();
  }, []);
  return (
    <div>
      {!visible ? (
        <Grid2 container spacing={1} py={2}>
          <Grid2 size={12}>
            {locationLoading ? (
              "loading..."
            ) : (
              <>
                {JSON.stringify(journeyKeys)}
                {JSON.stringify(journeysData)}
                {JSON.stringify(markLocations)}
              </>
            )}
          </Grid2>
          <Grid2 size={6}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ width: "100%" }}
              className="aeon-box-border aeon-box-shadow-bold aeon-transition"
              startIcon={<Iconify icon="entypo:location" />}
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Start Jouney
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ width: "100%" }}
              className="aeon-box-border aeon-box-shadow-bold aeon-transition"
              // onClick={onResetData}
            >
              action
            </Button>
          </Grid2>
        </Grid2>
      ) : (
        ""
      )}

      <TravelMapModal visible={visible} setVisible={setVisible} />
    </div>
  );
};
