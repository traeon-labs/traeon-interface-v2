import {Iconify} from "@/components/iconify";
import {BorderLinearProgress} from "@/components/Linear/customLinear";
import {INFTMetadata} from "@/types/index.type";
import {MARKETPLACE_ASSET_CONFIG} from "@/utils/constant";
import {
  Button,
  Card,
  CardMedia,
  Chip,
  Grid2,
  Typography
} from "@mui/material";
import {useMemo} from "react";

export const AssetCard = ({ item }: { item: INFTMetadata }) => {
  const assetConfig = useMemo(() => {
    return MARKETPLACE_ASSET_CONFIG[item.attributes.filter(att => att.trait_type === 'type')[0]?.value]
  },[item])
  return (
    <Grid2 size={6}>
      <Card
        className="w-100 aeon-box-shadow aeon-box-border"
        style={{
          cursor:'pointer',
          padding: "0.2rem 0.2rem 0rem 0.2rem",
        }}
      >
        <Chip
          style={{
            textAlign: "center",
            marginBottom: "0.4rem",
          }}
          color={assetConfig.color}
          className="aeon-chip-border-radius"
          size="small"
          icon={<Iconify icon={assetConfig.icon}/>}
          label={`#123241 ${assetConfig.label}`}
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
          {item.name}123241
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
            marginTop: "0.8rem",
            marginBottom: "0.5rem",
          }}
        >
          <div>
            {/* <Chip
              icon={<Iconify icon="token-branded:ton" />}
              label={<Typography>20</Typography>}
            /> */}
             <Button
              color='inherit'
              sx={{ background: "none", border: 'none'}}
              disabled
              startIcon={<Iconify icon="token-branded:ton" />}
            >
              <Typography sx={{color:'black'}}>20</Typography>
            </Button>
          </div>
          <div>
            <Button
              variant='outlined'
              color='inherit'
              sx={{marginRight: '0.5rem'}}
              className='aeon-box-border aeon-box-shadow-bold aeon-transition'
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
