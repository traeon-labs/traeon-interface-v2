import {Iconify} from "@/components/iconify";
import {BorderLinearProgress} from "@/components/Linear/customLinear";
import {INFTMetadata} from "@/types/index.type";
import {generateFractionalPrice} from "@/utils";
import {MARKETPLACE_ASSET_CONFIG} from "@/utils/constant";
import {
  Button,
  Card,
  CardMedia,
  Chip,
  Grid2,
  Typography,
} from "@mui/material";
import {useMemo} from "react";
import {openPaymentConfirmModal} from "../AeonPaymentPage/components/PaymentConfirmModal";

export const AssetCard = ({
  item,
  setCurrentAsset,
  setVisible,
  // visible,
}: {
  item: INFTMetadata;
  setCurrentAsset: React.Dispatch<
    React.SetStateAction<INFTMetadata | undefined>
  >;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const assetConfig = useMemo(() => {
    return MARKETPLACE_ASSET_CONFIG[
      item.attributes.filter((att) => att.trait_type === "type")[0]?.value
    ];
  }, [item]);
  const navigateToAssetPage = () => {
    setCurrentAsset(item);
    setVisible(true);
  };

  return (
    <Grid2 size={6}>
      <Card
        className="w-100 aeon-box-shadow aeon-box-border"
        style={{
          cursor: "pointer",
          padding: "0.2rem 0.2rem 0rem 0.2rem",
        }}
      >
        <Chip
          style={{
            textAlign: "center",
            marginBottom: "0.4rem",
            opacity: 0.7,
          }}
          color={assetConfig.color}
          className="aeon-chip-border-radius"
          size="small"
          icon={<Iconify icon={assetConfig.icon} />}
          label={`${assetConfig.label}`}
        />
        <CardMedia
          onClick={navigateToAssetPage}
          component="img"
          image={item.image}
          alt="App 1"
          sx={{
            borderRadius: "20px",
          }}
        />
        <Card style={{ textAlign: "center", marginTop: "0.4rem" }}>
          <Typography typography={"small"} sx={{fontSize: '12px'}}>{item.name}</Typography>
        </Card>
        <div
          style={{
            textAlign: "center",
            marginTop: "0.4rem",
            width: "90%",
            marginLeft: "5%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              // paddingLeft: "0.5rem",
              // paddingRight: "0.5rem",
              paddingBottom: '0.2rem'
            }}
          >
            <Typography sx={{fontSize: '12px'}}>Mint: {Math.round(generateFractionalPrice(item.name) * 1232)}</Typography>
            <Typography sx={{fontSize: '12px'}}>Lv: {Math.round(generateFractionalPrice(item.name) * 7)}</Typography>
          </div>
          {/* <LinearProgress color="info" /> */}
          <BorderLinearProgress
            variant="determinate"
            // color="inherit"
            color={assetConfig.color as any}
            style={{ height: "5px", border: '0.5px solid black' }}
            value={generateFractionalPrice(item.name) * 20}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            justifyItems: "center",
            width: "100%",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <div>
            <Button
              color="inherit"
              sx={{ background: "none", border: "none" }}
            >
              <Chip icon ={<Iconify icon="token:usdt" sx={{width: '18px', height: '18px'}} />}label={<Typography sx={{ color: "black", fontSize: '12px' }}>{generateFractionalPrice(item.name)}</Typography>}/>
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ marginRight: "0.5rem", fontSize: '10px' }}
              className="aeon-box-border aeon-box-shadow-bold aeon-transition"
              startIcon={<Iconify icon="icon-park-outline:buy" />}
              onClick={() => {
                openPaymentConfirmModal(item);
              }}
            >
              Buy
            </Button>
          </div>
        </div>
      </Card>
    </Grid2>
  );
};
