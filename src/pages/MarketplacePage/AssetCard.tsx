import { Iconify } from "@/components/iconify";
import { BorderLinearProgress } from "@/components/Linear/customLinear";
import { INFTMetadata } from "@/types/index.type";
import {
  Button,
  Card,
  CardMedia,
  Chip,
  Grid2,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";

export const AssetCard = ({ item }: { item: INFTMetadata }) => {
  return (
    <Grid2 size={6}>
      <Card
        className="w-100 aeon-box-shadow aeon-box-border"
        style={{
          padding: "0.2rem 0.2rem 0rem 0.2rem",
        }}
      >
        <Chip
          style={{
            textAlign: "center",
            marginBottom: "0.4rem",
          }}
          color="secondary"
          className="aeon-chip-border-radius"
          size="small"
          label="#123241 Clothes"
        />
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
            width: '90%',
            marginLeft:'5%',
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
          <BorderLinearProgress
            variant="determinate"
            color="inherit"
            style={{ height: "5px" }}
            value={50}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems:'center',
            justifyItems:'center',
            width: '100%',
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <div>
            <Chip
              sx={{ background: "none" }}
              icon={<Iconify icon="token-branded:ton" />}
              label={<Typography>20</Typography>}
            />
          </div>
          <div>
            <Button
              variant='outlined'
              color='inherit'
              className='aeon-box-border'
              startIcon={<Iconify icon="icon-park-outline:buy" />}
            >
              Buy
            </Button>
          </div>
        </div>
      </Card>
    </Grid2>
  );
};
