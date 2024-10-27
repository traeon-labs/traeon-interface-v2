import {Iconify} from "@/components/iconify";
import {BorderLinearProgress} from "@/components/Linear/customLinear";
import useLocationStorage from "@/hook/useLocationStorage";
import {decodeLocationkey,generateFractionalPrice} from "@/utils";
import {
  Button,
  Chip,
  Grid2,
  Typography
} from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import {useEffect} from "react";

export const TravelPage = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const onResetData = async () => {
  //   const keys = await cloudData.getKeys();
  //   await cloudData.deleteItem(keys);
  // };
  const {
    journeyKeys,
    locationLoading,
    journeysData,
    markLocations,
    refresh: locationRefresh,
  } = useLocationStorage();

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
            sx={{ width: "100%", height: "50px" }}
            className="aeon-box-border aeon-box-shadow-bold aeon-transition"
            startIcon={<Iconify icon="entypo:location" />}
            onClick={() => {
              setVisible(!visible);
            }}
          >
            Start Journey
          </Button>
        </Grid2>
  
        {locationLoading
          ? "Loading..."
          : journeyKeys.length === 0 ? (
              <Grid2 size={12} sx={{ p: 2, textAlign: "left" }}>
                <Typography variant="h6">
                  No locations available.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Please follow these directions to get started:
                  <ul>
                    <li>Check your internet connection.</li>
                    <li>Ensure your device's location services are enabled.</li>
                    <li>Try refreshing the page.</li>
                    <li>If the issue persists, contact support.</li>
                  </ul>
                </Typography>
              </Grid2>
            ) : (
              journeyKeys.slice(0, 2).map((jKey, _) => {
                const jData = journeysData[jKey];
                const { color } = markLocations[jKey];
                const [country, place] = decodeLocationkey(jKey);
                return (
                  <Grid2
                    size={12}
                    key={_}
                    sx={{ p: 2, my: 4, margin: 0.5, transition: 0 }}
                    className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                  >
                    <Grid2 size={12} py={1}>
                      <Typography variant="subtitle1">
                        <strong>{country}</strong> {"|"} {place}{" "}
                        <Chip
                          label="Place"
                          sx={{ background: color, opacity: 0.8, cursor: 'pointer' }}
                          onClick={() => { setVisible(true) }}
                          icon={<Iconify color="black" icon="mi:location" />}
                        />{" "}
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
                              {mData.place_name}
                            </Typography>
                          </Grid2>
                        </div>
                      );
                    })}
                  </Grid2>
                );
              })
            )}
      </Grid2>
    ) : (
      ""
    )}
  </div>
  
  );
};
