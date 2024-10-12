import { Iconify } from "@/components/iconify";
import { BorderLinearProgress } from "@/components/Linear/customLinear";
import { INFTMetadata } from "@/types/index.type";
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
import { Modal, Typography } from "@telegram-apps/telegram-ui";
import { useEffect, useMemo, useRef, useState } from "react";

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

export const PaymentConfirmModal = () => {
  const [visible, setVisible] = useState(false);
  const [asset, setAsset] = useState<INFTMetadata>();
  const [paymentType, setPaymentType]= useState<'TON' | 'AEON'>('AEON')
  const resolveRef = useRef<(value: boolean) => void>(() => {
    throw new Error("RESOLVE_REF_UNSET");
  });

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
  const purchaseItemViaAeon = () => {};
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
                          label={<Typography Component={"h4"}>{12}</Typography>}
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
                  >
                    <Chip
                      variant="filled"
                      sx={{
                        fontSize: "20px",
                        // background: 'none',
                        width: "100%",
                        padding: "0.5rem",
                      }}
                      label={`20 ~ $${1.51}`}
                      icon={<Iconify icon="token:ton" />}
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
              sx={{ my: 3, border: '1px solid', p: 2, borderRadius: '20px' }}
            >
              <Stack direction="column" spacing={1.5}>
              <Typography style={{ width: '100%', textAlign:'center', marginBottom: '0.5rem'}}>Payment Method</Typography>
                <Button
                  className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                  onClick={() => {setPaymentType('AEON')}}
                  startIcon={<Avatar alt="Natacha" sx={{width: '36px', height: '36px'}} src="/logo-aeon.png" />}
                  endIcon={
                    <AvatarGroup
                    >
                     <Iconify width='28px' sx={{marginLeft: '1px'}} icon='token:bnb'/>
                     <Iconify width='28px' sx={{marginLeft: '1px'}} icon='token:ton'/>
                     <Iconify width='28px' sx={{marginLeft: '1px'}} icon='token:eth'/>
                     <Iconify width='28px' sx={{marginLeft: '1px'}} icon='token:arbitrum-one'/>
                     <Iconify width='28px' sx={{marginLeft: '1px'}} icon='token:op'/>

                    </AvatarGroup>
                  }
                  color="inherit"
                  sx={paymentType === 'AEON' ? {background:'black', color: 'white'} : {}}
                  variant={ paymentType === 'AEON' ? 'contained' : "outlined"}
                >
                  payment Via Aeon
                </Button>
                <Button
                  className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                  onClick={() => {setPaymentType('TON')}}
                  endIcon={
                     <Iconify width='28px' sx={{marginLeft: '1px'}} icon='token:ton'/>
                  }
                  sx={paymentType === 'TON' ? {background:'black', color: 'white'} : {}}
                  color="inherit"
                  
                >
                  $TON Currency Network
                </Button>
              </Stack>
            </Box>
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
                color="secondary"
                startIcon={
                  <Iconify
                    icon={"material-symbols:confirmation-number-outline"}
                  />
                }
                className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                sx={{ width: "50%", marginLeft: "1%", marginRight: "1%" }}
              >
                Confirm
              </Button>
            </Box>
          </>
        )}

        {/* {isLoading && <SkeletonassetDetails />} */}
      </Container>
    </Modal>
  );
};

export const openPaymentConfirmModal = async (
  asset: INFTMetadata
): Promise<boolean> => {
  return new Promise((resolve) => _confirm({ resolve, asset }));
};
