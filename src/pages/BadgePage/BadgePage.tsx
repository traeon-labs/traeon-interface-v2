import { Iconify } from "@/components/iconify";
import { BorderLinearProgress } from "@/components/Linear/customLinear";
import useLocationStorage from "@/hook/useLocationStorage";
import { decodeLocationkey, generateFractionalPrice } from "@/utils";
import { Button, Card, CardMedia, Chip, Grid2, Typography } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";

export const BadgePage = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
          {/* <Grid2 size={12}>
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
          </Grid2> */}

          {locationLoading ? (
            "loading..."
          ) : journeyKeys.length === 0 ? (
            <Grid2 size={12} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">No Check-ins Yet</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Begin your journey by checking in at locations! Each check-in earns you a badge on-chain, which you can share as proof of your adventure.
              </Typography>
              <Button
              variant="outlined"
              color="inherit"
              sx={{ width: "100%", height: "50px", mt:2}}
              className="aeon-box-border aeon-box-shadow-bold aeon-transition"
              startIcon={<Iconify icon="entypo:location" />}
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Do your move
            </Button>
            </Grid2>
          ) : (
            journeyKeys.map((jKey, _) => {
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
                        sx={{ background: color, opacity: 0.8, cursor: "pointer" }}
                        onClick={() => {
                          setVisible(true);
                        }}
                        icon={<Iconify color="black" icon="mi:location" />}
                      />
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
                          <Typography variant="subtitle1">{mData.place_name}</Typography>
                        </Grid2>
                      </div>
                    );
                  })}
                  <Grid2 size={8} key={_} pt={2}>
                    <Card
                      className="w-100 aeon-box-shadow aeon-box-border"
                      style={{
                        cursor: "pointer",
                        padding: "0.2rem 0.2rem 0rem 0.2rem",
                        textAlign: "left",
                      }}
                    >
                      <Chip
                        style={{
                          textAlign: "center",
                          marginBottom: "0.4rem",
                          opacity: 0.7,
                        }}
                        className="aeon-chip-border-radius"
                        size="small"
                        icon={<Iconify icon="streamline:star-badge-solid" />}
                        label={`Badge`}
                      />
                      <CardMedia
                        component="img"
                        onClick={() => {
                          setVisible(true);
                        }}
                        image={"/badge/" + Math.round(2 + Math.random() * 9) + ".png"}
                        sx={{
                          borderRadius: "20px",
                        }}
                      />
                    </Card>
                  </Grid2>
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
