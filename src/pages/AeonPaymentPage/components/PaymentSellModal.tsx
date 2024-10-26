import { Iconify } from "@/components/iconify";
import { BorderLinearProgress } from "@/components/Linear/customLinear";
import { INFTMetadata } from "@/types/index.type";
import { createAeonOrdersWithTma } from "@/utils/aeon/createOrder";
import { MARKETPLACE_ASSET_CONFIG } from "@/utils/constant";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  Grid2,
  IconButton,
  Stack,
} from "@mui/material";
import { Input, Modal, Typography } from "@telegram-apps/telegram-ui";
import { useEffect, useMemo, useRef, useState } from "react";
import { openAeonPayment } from "./AeonPaymentModal";
import {
  generateAeonResError,
  generateFractionalPrice,
  generateOrderKey,
} from "@/utils";
import { useInitData } from "@tma.js/sdk-react";
import { fetchAeonOrder } from "@/utils/aeon/fetchOrder";
import useAccountOrders from "@/pages/IndexPage/AccountOrdersModal/hook/useAccountOrders";
import { openAccountOrdersModal } from "@/pages/IndexPage/AccountOrdersModal/AccountOrdersModal";
import { LineMdLoadingLoop } from "@/components/icons/LineMdLoadingLoop";
import { cloudStorage as cloudData } from "@telegram-apps/sdk";

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

let _confirm: (props: {
  resolve?: (value: boolean) => void;
  asset: INFTMetadata;
}) => void = () => {};

export const PaymentSellModal = () => {
  const [visible, setVisible] = useState(false);
  const [asset, setAsset] = useState<INFTMetadata>();
  const [creatingOrder, setCreatingOrder] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<"TON" | "AEON">("AEON");
  const resolveRef = useRef<(value: boolean) => void>(() => {
    throw new Error("RESOLVE_REF_UNSET");
  });
  const {
    orders,
    setUnfillOrders,
    setOrders,
    pendingOrders,
    loadingOrders,
    refreshOrdersData,
  } = useAccountOrders();
  useEffect(() => {
    _confirm = ({
      resolve,
      asset,
    }: {
      resolve?: (value: boolean) => void;
      asset: INFTMetadata;
    }) => {
      if (resolve) resolveRef.current = resolve;
      setVisible(true);
      setAsset(asset);
    };
  }, []);

  useEffect(() => {
    if (visible) window.scrollTo(0, 0);
  }, [visible]);

  const assetConfig = useMemo(() => {
    if (asset)
      return MARKETPLACE_ASSET_CONFIG[
        asset.attributes.filter((att) => att.trait_type === "type")[0]?.value
      ];
  }, [asset]);
  const tgInitData = useInitData();
  // const cloudData = useCloudStorage(false);
  // const cloudData = useCloudStorageRaw(false);

  const purchaseItem = async () => {
    if (paymentType === "AEON") {
      setCreatingOrder(true);
      try {
        if (!tgInitData?.user?.id) {
          openAeonPayment(
            generateAeonResError("Telegram authentication Error!", "503")
          );
          return;
        }
        if (!asset?.name) {
          openAeonPayment(
            generateAeonResError("Asset not available now!", "404")
          );
          return;
        }

        // const merchantOrderKey = generateOrderKey(String(tgInitData?.user?.id));
        // const res = await createAeonOrdersWithTma(
        //   {
        //     merchantOrderNo: merchantOrderKey,
        //     orderAmount: String(generateFractionalPrice(asset?.name) * 100), // 10U
        //     payCurrency: "USD",
        //     userId: String(tgInitData?.user?.id),
        //     paymentExchange: "3b43c82c-8ead-4533-9e39-0bf433b6a321",
        //     paymentTokens: "USDT,ETH",
        //   },
        //   { assetId: asset.name }
        // );
        // if (res) openAeonPayment(res);
        // if (res?.model?.webUrl) {
        //   console.log("fetching aeon orders", merchantOrderKey);
        //   const orderData = await fetchAeonOrder({
        //     merchantOrderNo: merchantOrderKey,
        //   });
        //   console.log("Adding to telegram store aeon orders", merchantOrderKey);
        //   if (orderData?.model) setUnfillOrders([orderData?.model]);
        //   try {
        //     await cloudData.setItem(`order_${merchantOrderKey}`, "");
        //   } catch (error) {
        //     console.log(error);
        //   }
        //   console.log("Added to telegram store aeon orders", merchantOrderKey);
        // }
        await setTimeout(async () => {
          // await refreshOrdersData();
          // setUnfillOrders([]);
          setCreatingOrder(false);
          setVisible(false);
        }, 3000);
      } catch (error) {
        setCreatingOrder(false);

        console.log(error);
      }
    } else {
    }
  };
  return (
    <Modal open={visible} trigger={undefined} onOpenChange={setVisible}>
      <Container>
        {asset && assetConfig && (
          <>
            <Grid2 container spacing={2}>
              <Grid2
                size={12}
                sx={{
                  position: "fixed",
                  display: "flex",
                  zIndex: 10,
                  top: 0,
                  justifyContent: "space-between",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  paddingLeft: "0.5rem",
                }}
              >
                <div>
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
                    <Iconify icon="vaadin:close" width={20} />
                  </IconButton>{" "}
                </div>
                <div>{/* <WalletPropover allowPopover={false} /> */}</div>
              </Grid2>
              <Grid2 size={4} />
              <Grid2 size={4} sx={{ textAlign: "center" }}>
                <Chip
                  style={{
                    textAlign: "center",
                    marginTop: "1rem",
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
              <Grid2
                size={6}
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
              <Grid2 size={6} sx={{ height: "200px", textAlign: "left" }}>
                {_MOCK_ATTS.map((att, _) => {
                  return (
                    <Grid2 container sx={{ width: "100%" }} key={_}>
                      <Grid2
                        size={6}
                        sx={{ textAlign: "left", marginTop: "0.5rem" }}
                      >
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
                            <Typography Component={"h5"}>
                              {att.label}
                            </Typography>
                          }
                          onClick={() => {
                            navigator.clipboard.writeText(asset.name);
                          }}
                        />
                      </Grid2>
                      <Grid2
                        size={6}
                        sx={{ textAlign: "right", marginTop: "0.5rem" }}
                      >
                        <Chip
                          variant="outlined"
                          style={{
                            textAlign: "center",
                            border: "none",
                          }}
                          label={
                            <Typography Component={"h4"}>
                              {generateFractionalPrice(att.label + asset.name)}
                            </Typography>
                          }
                          onClick={() => {
                            navigator.clipboard.writeText(asset.name);
                          }}
                        />
                      </Grid2>
                    </Grid2>
                  );
                })}
                <Grid2 container sx={{ width: "100%" }}>
                  <Button
                    color="inherit"
                    size="large"
                    sx={{
                      background: "none",
                      border: "none",
                      color: "black",
                      width: "100%",
                    }}
                    endIcon={
                      <Iconify
                        icon="token:usdt"
                        width={35}
                        sx={{ color: "gray" }}
                      />
                    }
                  >
                    <Input
                      placeholder="Your price..."
                      required
                      color="error"
                      className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                      style={{ padding: 1, fontSize: "15px" }}
                    />
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
            <Box
              gap={1}
              display="black"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              sx={{ my: 3, border: "1px solid", p: 2, borderRadius: "20px" }}
            >
              <Stack direction="column" spacing={1.5}>
                <Typography
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography style={{fontSize: '15px'}}>
                    Transaction Method Enriched by
                    <br />
                    <Chip
                      label={<Typography style={{fontSize: '15px', fontWeight:800}}>AEON Payment</Typography>}
                      color="default"
                      variant="outlined"
                      sx={{ border: "none", mx: 0 }}
                      icon={
                        <Avatar
                          alt="Aeon logo"
                          src="/logo-aeon.png"
                          sx={{
                            width: 28,
                            height: 28,
                            p: 0.5, 
                            marginLeft: 1,
                            marginRight: 1,
                          }}
                        />
                      }
                    />
                    |
                    <Chip
                      label={<Typography style={{fontSize: '15px', fontWeight:800}}>TON Network</Typography>}
                      color="default"
                      variant="outlined"
                      sx={{ border: "none", color: "black", mx: 0 }}
                      icon={
                        <Iconify
                          icon="token:ton"
                          style={{
                            color: "black",
                            marginLeft: 8,
                            width: 28,
                            height: 28,
                          }}
                        />
                      }
                    />
                  </Typography>
                </Typography>
              </Stack>
            </Box>
            {pendingOrders.length > 0 ? (
              <Box display="flex" sx={{ my: 0.5, marginLeft: "1%" }}>
                <Typography
                  style={{
                    paddingBottom: "0.3rem",
                    cursor: "pointer",
                    borderBottom: "1px dashed",
                  }}
                  onClick={() => {
                    openAccountOrdersModal();
                  }}
                >
                  Pending orders ({pendingOrders.length})
                </Typography>
              </Box>
            ) : (
              ""
            )}

            <Box
              gap={1}
              display="flex"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              sx={{ my: 3 }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  setVisible(false);
                }}
                startIcon={<Iconify icon="uil:cancel" />}
                className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                sx={{
                  width: "50%",
                  padding: "0.5rem",
                  marginRight: "1%",
                  marginLeft: "1%",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="error"
                disabled={creatingOrder}
                startIcon={
                  creatingOrder ? (
                    <LineMdLoadingLoop />
                  ) : (
                    <Iconify icon={"ic:outline-sell"} />
                  )
                }
                className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                sx={{ width: "50%", marginLeft: "1%", marginRight: "1%" }}
                onClick={purchaseItem}
              >
                Sell
              </Button>
            </Box>
          </>
        )}

        {/* {isLoading && <SkeletonassetDetails />} */}
      </Container>
    </Modal>
  );
};

export const openPaymentSellModal = async (
  asset: INFTMetadata
): Promise<boolean> => {
  return new Promise((resolve) => _confirm({ resolve, asset }));
};
