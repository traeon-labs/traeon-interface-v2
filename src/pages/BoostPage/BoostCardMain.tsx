import { Iconify } from "@/components/iconify";
import { BorderLinearProgress } from "@/components/Linear/customLinear";
import { INFTMetadata } from "@/types/index.type";
import { generateFractionalPrice } from "@/utils";
import { MARKETPLACE_ASSET_CONFIG } from "@/utils/constant";
import {
  Button,
  Card,
  CardMedia,
  Chip,
  Grid2,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { openPaymentConfirmModal } from "../AeonPaymentPage/components/PaymentConfirmModal";
import { _MOCK_ATTS } from "../AssetModal/AssetModal";
import {openPaymentSellModal} from "../AeonPaymentPage/components/PaymentSellModal";

export const BoostCardMain = ({
  item,
  setCurrentAsset,
  setVisible,
}: // visible,
{
  item: INFTMetadata;
  setCurrentAsset: React.Dispatch<
    React.SetStateAction<INFTMetadata | undefined>
  >;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const assetConfig = useMemo(() => {
    openPaymentSellModal(item)
    return MARKETPLACE_ASSET_CONFIG[
      item.attributes.filter((att) => att.trait_type === "type")[0]?.value
    ];
  }, [item]);
  const navigateToAssetPage = () => {
    setCurrentAsset(item);
    setVisible(true);
  };

  // const assetPurchase = () => {};
  return (
    <Grid2 size={12}>
      <Card
        className="w-100 aeon-box-shadow aeon-box-border"
        style={{
          cursor: "pointer",
          background: "#ECECEC",
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
          label={`${item.name} | ${assetConfig.label}`}
        />
        <Grid2 container>
          <Grid2 size={2} />
          <Grid2 size={8} className="aeon-box-border">
            <CardMedia
              onClick={navigateToAssetPage}
              component="img"
              image={item.image}
              alt="App 1"
              sx={{
                borderRadius: "20px",
              }}
            />
          </Grid2>
          <Grid2 size={2} />
        </Grid2>

        {/* <Card style={{ textAlign: "center", marginTop: "0.4rem" }}>
          <Typography typography={"small"} sx={{ fontSize: "12px" }}>
            {item.name}
          </Typography>
        </Card> */}
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
              paddingBottom: "0.2rem",
            }}
          >
            <Typography sx={{ fontSize: "12px", textAlign: "left" }}>
              Boost NFTs are exclusive collectibles that enhance your gaming
              experience. Holders enjoy a 20% increase in experience points (XP)
              and a 15% token multiplier, allowing for faster leveling and token
              accumulation. <br /> Plus, gain access to exclusive events and
              personalized rewards tailored to your gaming journey.
            </Typography>
            {/* <Typography sx={{ fontSize: "12px" }}>
              Lv: {Math.round(generateFractionalPrice(item.name) * 7)}
            </Typography> */}
          </div>
          {_MOCK_ATTS.map((att, _) => {
            return (
              <Grid2 container sx={{ width: "100%" }} key={_} py={0.5} pt={1}>
                <Grid2 size={4} sx={{ textAlign: "left" }}>
                  <Chip
                    variant="filled"
                    style={{
                      textAlign: "center",
                      border: "1px solid  black",
                      opacity: 0.7,
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    color={att.color as any}
                    icon={<Iconify icon={att.icon} />}
                    label={
                      <Typography
                        sx={{ fontSize: "12px" }}
                        typography={"small"}
                      >
                        {att.label}
                      </Typography>
                    }
                    onClick={() => {
                      navigator.clipboard.writeText(item.name);
                    }}
                  />
                </Grid2>
                <Grid2 size={6} sx={{ textAlign: "center" }}>
                  <BorderLinearProgress
                    variant="determinate"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    color={att.color as any}
                    style={{
                      height: "5px",
                      border: "1px solid black",
                      marginTop: "0.5rem",
                    }}
                    value={20 + _ * 10}
                  />
                </Grid2>
                <Grid2 size={2} sx={{ textAlign: "center" }}>
                  <Chip
                    variant="outlined"
                    style={{
                      textAlign: "center",
                      border: "none",
                    }}
                    label={
                      <Typography
                        sx={{ fontSize: "12px" }}
                        typography={"small"}
                      >
                        {generateFractionalPrice(att.label + item.name)}
                      </Typography>
                    }
                    onClick={() => {
                      navigator.clipboard.writeText(item.name);
                    }}
                  />
                </Grid2>
              </Grid2>
            );
          })}
          {/* <LinearProgress color="info" /> */}
          {/* <BorderLinearProgress
            variant="determinate"
            // color="inherit"
            color={assetConfig.color as any}
            style={{ height: "5px", border: "1px solid black", paddingTop: 1}}
            value={generateFractionalPrice(item.name) * 20}
          /> */}
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
            <Button color="inherit" sx={{ background: "none", border: "none" }}>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginRight: "0.5rem", fontSize: "15px" }}
                className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                startIcon={<Iconify icon="ic:outline-sell" />}
                onClick={() => {
                  // openPaymentConfirmModal(item);
                  openPaymentSellModal(item)
                }}
              >
                Sell
              </Button>
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: "0.5rem", fontSize: "15px" }}
              className="aeon-box-border aeon-box-shadow-bold aeon-transition"
              startIcon={<Iconify icon="akar-icons:thunder" />}
              onClick={() => {
                // openPaymentConfirmModal(item);
              }}
            >
              Start with item (x3)
            </Button>
          </div>
        </div>
      </Card>
    </Grid2>
  );
};
