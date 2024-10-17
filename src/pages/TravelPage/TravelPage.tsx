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
  return (
    <div>
      {!visible ? (
        <Grid2 container pb={2} spacing={1}>
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
      ''
      )}

      <TravelMapModal visible={visible} setVisible={setVisible} />
    </div>
  );
};
