import {BorderLinearProgress} from "@/components/Linear/customLinear";
import {INFTMetadata} from "@/types/index.type";
import {
  Button,
  Card,
  CardMedia,
  Chip,
  Grid2,
  LinearProgress,
  Typography
} from "@mui/material";

export const AssetCard = ({ item }: { item: INFTMetadata }) => {
  return (
    <Grid2 size={6}>
      <Card
        className="w-100 aeon-box-shadow aeon-box-border"
        style={{
          padding: "0.2rem",
        }}
      >
        <Chip
          style={{
            textAlign: "center",
            marginBottom: "0.4rem",
          }}
          color="secondary"
          className="aeon-chip-border-radius"
          size='small'
          label="#123241 Clothes"/>
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
          {/* <LinearProgress color="info" /> */}
          <BorderLinearProgress variant="determinate" style={{height: '5px'}} value={50} />
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
