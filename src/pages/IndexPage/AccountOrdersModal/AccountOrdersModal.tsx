import {Iconify} from "@/components/iconify";
import {LineMdLoadingLoop} from "@/components/icons/LineMdLoadingLoop";
import {AEON_EXPLORE_WEBURL} from "@/config";
import marketplaceAssets from "@/nfts/metadata/nfts.json";
import {openAeonPayment} from "@/pages/AeonPaymentPage/components/AeonPaymentModal";
import {INFTMetadata} from "@/types/index.type";
import {decodeTimestampAgo,getOrderStatusColor,shortenAddress} from "@/utils";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Container,
  Grid2,
  IconButton,
  Skeleton,
  Typography
} from "@mui/material";
import {Modal} from "@telegram-apps/telegram-ui";
import {useEffect,useMemo,useRef,useState} from "react";
import {WalletPropover} from "../AccountPropover/WalletPropover";
import useAccountOrders from "./hook/useAccountOrders";

let _confirm: (props: {
  resolve?: (value: boolean) => void;
}) => void = () => {};

export const AccountOrdersModal = ({
  setAssestModal,
  setCurrentAsset,
}: {
  setCurrentAsset?: React.Dispatch<
    React.SetStateAction<INFTMetadata | undefined>
  >;
  setAssestModal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [visible, setVisible] = useState(false);
  const { orders,unfillOrders, loadingOrders, refreshOrdersData } =
    useAccountOrders();
  const ordersWithSort = useMemo(() => {
    const _order = orders.sort(
      (a, b) =>
        Number(JSON.parse(b?.customParam || '{}')?.["orderTs"] || 0) -
        Number(JSON.parse(a?.customParam || '{}')?.["orderTs"] || 0)
    );
    return _order;
  }, [orders]);
  const resolveRef = useRef<(value: boolean) => void>(() => {
    throw new Error("RESOLVE_REF_UNSET");
  });

  useEffect(() => {
    _confirm = ({ resolve }: { resolve?: (value: boolean) => void }) => {
      if (resolve) resolveRef.current = resolve;
      setVisible(true);
    };
  }, []);

  useEffect(() => {
    if (visible) window.scrollTo(0, 0);
    refreshOrdersData();
  }, [visible]);

  return (
    <Modal
      open={visible}
      trigger={undefined}
      onOpenChange={setVisible}
      style={{ maxHeight: "100vh" }}
    >
      <Container sx={{ height: "100vh" }}>
        <Grid2 container>
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
           {!loadingOrders ?  <Grid2 size={12} sx={{textAlign:'center'}}>
               <Typography style={{paddingBottom: '0.5rem'}}onClick={() => {openAccountOrdersModal()}}>Orders history ({orders.length})</Typography>
               </Grid2> : ''}
          {orders.length === 0 && !loadingOrders ? (
            <Grid2 size={12} py={1} sx={{textAlign: 'center'}}>
              No Orders Found
            </Grid2>
          ) : loadingOrders ? (
              [1,2,3].map(_ => {
                return <Grid2 size={12} key={_} py={1}>
                  <Skeleton variant="rectangular" sx={{borderRadius:'20px'}} width={'100%'} height={'150px'} />
                </Grid2>
              })
          ) : (
            ordersWithSort.map((order, _) => {
              const ts = decodeTimestampAgo(JSON.parse(order?.customParam || "{}")?.orderTs, true)
              const assetId = JSON.parse(order?.customParam || "{}")?.assetId
              const assetData = marketplaceAssets.filter(asset => asset.name === assetId)?.[0]
              const isUnFilledOrders = unfillOrders.filter(uOrd => uOrd.orderNo === order.orderNo)[0]?.orderNo !== undefined
              return (
                <Grid2
                  size={12}
                  key={_}
                  sx={{ p: 2, margin: 0.5, transition: 0 }}
                  className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                >
                  <Grid2 size={12}>
                    <Typography variant="subtitle1">
                      Address:{" "}
                      <strong>
                        {order?.address ? shortenAddress(order?.address) : 'Pending address...'}
                      </strong>
                    </Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    <Typography variant="subtitle1">
                      Amount:{" "}
                      <strong>
                        {order.orderAmount} {order.orderCurrency}
                      </strong>
                    </Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    <Typography variant="subtitle1">
                      Create At:{" "}
                      <strong>
                      {ts === '0' ? 'N/A' : ts}
                      </strong>
                    </Typography>
                  </Grid2>
                
                  <Grid2 size={12}>
                    <Typography variant="subtitle1">
                      Fee: <strong> {order.fee ? order.fee : 'Pending fee...'}</strong>
                    </Typography>
                  </Grid2>
                  {assetData?.name ? <Grid2 size={12} sx={{mb:1}}>
                    <Typography variant="subtitle1">
                      Asset:  <Chip
                        className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                        icon={<Avatar sx={{width: '28px', height: '28px', border: '1px solid'}} src={assetData?.image}/>}
                        sx = {{opacity: 0.8}}
                        onClick={() => {
                          if(setCurrentAsset && setAssestModal) {
                            setCurrentAsset(assetData)
                            setAssestModal(true)
                          }
                        }}
                        label={<strong> {shortenAddress(assetData?.name)}</strong>}
                        color={'default'}
                      />
                    </Typography>
                  </Grid2> : ''}
                  <Grid2 size={12}>
                    <Typography variant="body1">
                      Order: {' '}
                      <Button
                        variant="contained"
                        color='inherit'
                        className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                        startIcon={<Avatar alt="Natacha" sx={{background: 'black', p: '4px', width: '18px', height: '18px'}} src="/logo-aeon.png" />}
                        endIcon={
                          <Iconify icon="lucide-lab:tab-arrow-up-right" />
                        }
                        onClick={() => {
                          openAeonPayment({
                            code: '',
                            msg: '',
                            traceId: '',
                            model: {
                              webUrl: `${AEON_EXPLORE_WEBURL}/transferInformation?orderNo=${order.orderNo}`,
                              orderNo: order.orderNo
                            },
                            success: true,
                            error: false
                          })
                        }}
                        sx={{ mr: 1, px: 2 }}
                      >
                        {shortenAddress(order.orderNo,0,3)}
                      </Button>
                      <Chip
                        className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                        icon={(isUnFilledOrders ? <LineMdLoadingLoop color="white"/> : '') as any}
                        sx = {{opacity: 0.8}}
                        label={isUnFilledOrders ? 'PENDING' : order.orderStatus}
                        color={isUnFilledOrders ? 'warning' : getOrderStatusColor(order.orderStatus)}
                      />
                    </Typography>
                  </Grid2>

                </Grid2>
              );
            })
          )}
          {/* <Grid2 size={12} className="w-100 "> */}
          <Card
            className=""
            sx={{
              textAlign: "center",
              borderRadius: "20px",
              py: 2,
              mb: 4,
              width: "100%",
              position: 'sticky',
              bottom: '1rem',
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                setVisible(false);
              }}
              startIcon={<Iconify icon="uil:cancel" />}
              className="aeon-box-border aeon-box-shadow-bold aeon-transition"
              sx={{ py: 1, width: "48%", marginRight: "1%", marginLeft: "1%" }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={
                <Iconify icon={"streamline:arrow-reload-horizontal-2-solid"} />
              }
              className="aeon-box-border aeon-box-shadow-bold aeon-transition"
              sx={{ py: 1, width: "48%", marginLeft: "1%", marginRight: "1%" }}
              onClick={() => {
                refreshOrdersData();
              }}
            >
              Reload
            </Button>
          </Card>
          {/* </Grid2> */}
        </Grid2>
      </Container>
    </Modal>
  );
};

export const openAccountOrdersModal = async (): Promise<boolean> => {
  return new Promise((resolve) => _confirm({ resolve }));
};
