import { Iconify } from "@/components/iconify";
import {
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import { cloudStorage as cloudData } from "@telegram-apps/sdk";
import "mapbox-gl/dist/mapbox-gl.css";
import { TravelMapModal } from "./TravelMapModal";
import useLocationStorage from "@/hook/useLocationStorage";
import { useEffect } from "react";
import { decodeLocationkey, generateFractionalPrice } from "@/utils";
import { BorderLinearProgress } from "@/components/Linear/customLinear";

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
  const {
    journeyKeys,
    locationLoading,
    journeysData,
    markLocations,
    refresh: locationRefresh,
  } = useLocationStorage();

  console.log("#ma", markLocations);
  useEffect(() => {
    locationRefresh();
  }, []);
  return (
    <div>
      {!visible ? (
        <Grid2 container spacing={1} p={2}>
            <Grid2 size={12}>
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
          
          {locationLoading
            ? "loading..."
            : journeyKeys.map((jKey, _) => {
                const jData = journeysData[jKey];
                const { color } = markLocations[jKey];
                const [country, place] = decodeLocationkey(jKey);
                return (
                  <Grid2
                    size={12}
                    key={_}
                    sx={{ p: 2, margin: 0.5, transition: 0 }}
                    className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                  >
                    <Grid2 size={12}>
                      <Typography variant="subtitle1">
                        <strong>{country}</strong> {"|"} {place}
                      </Typography>
                    </Grid2>
                    <BorderLinearProgress
                      variant="determinate"
                      style={{
                        marginTop: 2,
                        marginBottom: 2,
                        height: "4px",
                        border: "1px solid black",
                        background: color,
                        opacity: 0.8,
                      }}
                      value={generateFractionalPrice(jKey) * 20}
                    />
                    {Object.keys(jData).map((mKey, __) => {
                      const mData = jData[mKey];
                      return (
                        <div key={__}>
                          <Grid2 size={12} pt={2}>
                            <Typography variant="subtitle1">
                              <Chip
                                label="Place"
                                icon={<Iconify icon="mi:location" />}
                              />{" "}
                              <strong>{mData.place_name}</strong>
                            </Typography>
                          </Grid2>
                          {/* <Grid2 size={12}>
                            <Typography variant="subtitle1">
                              <Button
                                variant="contained"
                                color="inherit"
                                className="aeon-box-border aeon-box-shadow-bold"
                                sx={{ borderColor: color }}
                                startIcon={<Iconify icon="mi:location" />}
                                onClick={() => {
                                  console.log("Location Clicked", mData.center);
                                }}
                              >
                                See on map
                              </Button>
                            </Typography>
                          </Grid2> */}
                        </div>
                      );
                    })}
                  </Grid2>
                );
              })}
        </Grid2>
      ) : (
        ""
      )}

      <TravelMapModal visible={visible} setVisible={setVisible} />
    </div>
  );
};
