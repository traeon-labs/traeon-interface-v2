import { Iconify } from "@/components/iconify";
import { IMUIColor, INFTMetadata } from "@/types/index.type";
import { MARKETPLACE_ASSET_CONFIG } from "@/utils/constant";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid2,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import { Modal, Typography } from "@telegram-apps/telegram-ui";
import { useMemo, useState } from "react";
import { WalletPropover } from "../IndexPage/AccountPropover/WalletPropover";
import { BorderLinearProgress } from "@/components/Linear/customLinear";
import AssetHistory from "./AssetHistory";
import { openPaymentConfirmModal } from "../AeonPaymentPage/components/PaymentConfirmModal";
import { generateFractionalPrice } from "@/utils";

const _MOCK_ATTS = [
  {
    label: "Efficiency",
    icon: "jam:rec",
    color: "success",
  },
  {
    label: "Luck",
    icon: "ph:square-bold",
    color: "warning",
  },
  {
    label: "Ticket",
    icon: "mdi:luck-outline",
    color: "secondary",
  },
  {
    label: "Comfort",
    icon: "ph:triangle-bold",
    color: "error",
  },
];

export default function AssetModal({
  setVisible,
  setCurrentAsset,
  visible,
  asset,
}: {
  asset?: INFTMetadata;
  setCurrentAsset: React.Dispatch<
    React.SetStateAction<INFTMetadata | undefined>
  >;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const { id } = useParams();
  // const asset: INFTMetadata = useMemo(() => {
  //   return marketplaceAssets.filter((asset) => asset.name === id)[0];
  // }, [id]);
  const [currentTab, setCurrentTab] = useState("trade_history");

  const TABS = [
    {
      value: "trade_history",
      label: `Trade history`,
      component: asset ? <AssetHistory /> : null,
    },
    {
      value: "description",
      label: "description",
      component: asset ? (
        <Typography Component={"h4"}>{asset.description}</Typography>
      ) : null,
    },
  ];
  const assetConfig = useMemo(() => {
    if (asset)
      return MARKETPLACE_ASSET_CONFIG[
        asset.attributes.filter((att) => att.trait_type === "type")[0]?.value
      ];
  }, [asset]);
  return (
    <Modal
      open={visible}
      trigger={undefined}
      onOpenChange={setVisible}
      style={{ maxHeight: "100vh" }}
    >
      <Container sx={{ height: "100vh" }}>
        {asset && assetConfig && (
          <>
            <Grid2 container spacing={1}>
              <Grid2
                size={12}
                sx={{
                  position: "sticky",
                  display: "flex",
                  zIndex: 2,
                  top: 0,
                  justifyContent: "space-between",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  background: "white",
                }}
              >
                <div style={{ marginTop: 2 }}>
                  <IconButton
                    size="large"
                    sx={{
                      borderRadius: "50%",
                    }}
                    className="aeon-box-shadow-bold aeon-transition"
                    onClick={() => {
                      setVisible(false);
                    }}
                  >
                    <Iconify icon="ic:outline-arrow-back-ios" width={20} />
                  </IconButton>{" "}
                </div>
                <div style={{ marginTop: 2 }}>
                  <WalletPropover allowPopover={false} />
                </div>
              </Grid2>
              <Grid2 size={1} />
              <Grid2
                size={10}
                sx={{ textAlign: "center", boxShadow: "5px 7px 10px black" }}
                className="aeon-box-border"
              >
                <CardMedia
                  component="img"
                  image={asset.image}
                  alt={asset.name}
                  sx={{
                    borderRadius: "20px",
                  }}
                />
              </Grid2>
              <Grid2 size={1} />
              <Grid2 size={4} />

              <Grid2 size={4} sx={{ textAlign: "center" }}>
                <Chip
                  style={{
                    textAlign: "center",
                    marginTop: "0.4rem",
                    padding: "0.5rem",
                    background: "rgb(222,222,222)",
                  }}
                  variant="outlined"
                  color="default"
                  icon={<Iconify icon="mingcute:hashtag-fill" />}
                  label={
                    <Typography Component={"h3"}>
                      {asset.name.split("#")[1]}
                    </Typography>
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(asset.name);
                  }}
                />
              </Grid2>
              <Grid2 size={4} />

              <Grid2 size={4} sx={{ textAlign: "center" }}>
                <Chip
                  style={{
                    textAlign: "center",
                    marginTop: "0.4rem",
                    padding: "0.5rem",
                    background: "rgb(222,222,222)",
                  }}
                  variant="outlined"
                  label={<Typography Component={"h3"}>Common</Typography>}
                  onClick={() => {
                    navigator.clipboard.writeText(asset.name);
                  }}
                />
              </Grid2>
              <Grid2 size={4} sx={{ textAlign: "center" }}>
                <Chip
                  variant="outlined"
                  style={{
                    textAlign: "center",
                    marginTop: "0.4rem",
                    padding: "0.5rem",
                    background: "rgb(222,222,222)",
                  }}
                  color="default"
                  icon={<Iconify icon="akar-icons:thunder" />}
                  label={
                    <Typography Component={"h3"}>
                      {(Math.random() * 1000).toFixed(2)}
                    </Typography>
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(asset.name);
                  }}
                />
              </Grid2>
              <Grid2 size={4} sx={{ textAlign: "center" }}>
                <Chip
                  variant="filled"
                  style={{
                    textAlign: "center",
                    marginTop: "0.4rem",
                    padding: "0.5rem",
                  }}
                  color="info"
                  icon={<Iconify icon="tabler:battery-4" />}
                  label={<Typography Component={"h3"}>100/100</Typography>}
                  onClick={() => {
                    navigator.clipboard.writeText(asset.name);
                  }}
                />
              </Grid2>
              <Grid2 size={12} sx={{ textAlign: "center" }}>
                <BorderLinearProgress
                  variant="determinate"
                  color="info"
                  style={{
                    height: "10px",
                    border: "1px solid black",
                    marginTop: "0.5rem",
                  }}
                  value={50}
                />

                <BorderLinearProgress
                  variant="determinate"
                  color="warning"
                  style={{
                    height: "10px",
                    border: "1px solid black",
                    marginTop: "0.5rem",
                  }}
                  value={20}
                />
              </Grid2>
              <Grid2
                size={12}
                sx={{ textAlign: "center", marginTop: "0.5rem" }}
              >
                <Typography Component={"h2"}> Attributes</Typography>
              </Grid2>
              {_MOCK_ATTS.map((att, _) => {
                return (
                  <Grid2 container sx={{ width: "100%" }} key={_}>
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
                          <Typography Component={"h5"}>{att.label}</Typography>
                        }
                        onClick={() => {
                          navigator.clipboard.writeText(asset.name);
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
                        label={<Typography Component={"h4"}>{generateFractionalPrice(att.label + asset.name)}</Typography>}
                        onClick={() => {
                          navigator.clipboard.writeText(asset.name);
                        }}
                      />
                    </Grid2>
                  </Grid2>
                );
              })}
            </Grid2>

            <Box
              gap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              sx={{ my: 1 }}
            ></Box>

            <Card>
              <Tabs
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                sx={{ px: 3, bgcolor: "background.neutral" }}
              >
                {TABS.map((tab) => (
                  <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
              </Tabs>

              <Divider />

              {TABS.map(
                (tab) =>
                  tab.value === currentTab && (
                    <Box
                      key={tab.value}
                      sx={{
                        p: 3,
                      }}
                    >
                      {tab.component}
                    </Box>
                  )
              )}
            </Card>
            <Card
              // className="aeon-box-border aeon-box-shadow-bold aeon-transition"
              sx={{
                position: "fixed",
                zIndex: 2,
                bottom: "20px",
                borderRadius: "20px",
                border: "1px solid gray",
                left: "5%",
                width: "90%",
                display: "flex",
                textAlign: "center",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                justifyContent: "space-between",
              }}
            >
              <Button
                color="default"
                size="large"
                sx={{
                  background: "none",
                  border: "none",
                  color: "black",
                  marginLeft: "1rem",
                }}
              >
                <Chip
                  sx={{ fontSize: "20px", padding: "0.5rem" }}
                  label={generateFractionalPrice(asset.name)}
                  icon={<Iconify icon="token:usdt" />}
                />
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ marginRight: "1rem" }}
                className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                onClick={() => {openPaymentConfirmModal(asset)}}
              >
                 <Chip
                  sx={{ background: 'none', fontSize: "16px" }}
                  label='Buy'
                  icon={<Iconify icon="icon-park-outline:buy" />}

                />
                {/* Buy */}
              </Button>
            </Card>
          </>
        )}

        {/* {isLoading && <SkeletonassetDetails />} */}
      </Container>
    </Modal>
  );
}
