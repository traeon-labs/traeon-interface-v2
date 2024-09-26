import {INFTMetadata} from "@/types/index.type";
import {
  Button,
  Card,
  CardMedia,
  Grid2,
  LinearProgress,
  Typography
} from "@mui/material";

export const AssetCard = ({ item }: { item: INFTMetadata }) => {
  return (
    <Grid2 size={6}>
      <Card
        className="w-100"
        style={{
          padding: "0.2rem",
        }}
      >
        <Card
          style={{
            textAlign: "center",
            marginBottom: "0.4rem",
          }}
        >
          Clothes
        </Card>
        <CardMedia
          component="img"
          image={item.image}
          alt="App 1"
          sx={{
            borderRadius: "20px",
          }}
        />
        <Card style={{ textAlign: "center", marginTop: "0.4rem" }}>
          {item.name}
        </Card>
        <div
          style={{
            textAlign: "center",
            marginTop: "0.4rem",
            width: "80%",
            marginLeft: "10%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              // paddingLeft: "0.5rem",
              // paddingRight: "0.5rem",
            }}
          >
            <Typography>Mint: 0</Typography>
            <Typography>Lv: 5</Typography>
          </div>
          <LinearProgress color="info" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button disabled>$12</Button>
          <Button>Buy</Button>
        </div>
      </Card>
    </Grid2>
  );
};
