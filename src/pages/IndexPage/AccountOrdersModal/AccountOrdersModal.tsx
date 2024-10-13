import { Iconify } from "@/components/iconify";
import {
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid2,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Modal, Skeleton } from "@telegram-apps/telegram-ui";
import { useEffect, useRef, useState } from "react";
import useAccountOrders from "./hook/useAccountOrders";
import { AEON_EXPLORE_WEBURL } from "@/config";
import { getOrderStatusColor, shortenAddress } from "@/utils";
import { WalletPropover } from "../AccountPropover/WalletPropover";

let _confirm: (props: {
  resolve?: (value: boolean) => void;
}) => void = () => {};

export const AccountOrdersModal = () => {
  const [visible, setVisible] = useState(false);
  const { orders, loadingOrders, refreshOrdersData,fetchOrdersFromStorage } = useAccountOrders();
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
    fetchOrdersFromStorage();
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
          {orders.length === 0 && !loadingOrders
            ? "No Orders Found"
            : loadingOrders
            ? <Skeleton>Loading...</Skeleton>
            : orders.map((order, _) => {
                return (
                  <Grid2
                    size={12}
                    key={_}
                    sx={{p: 2, margin: 0.5}}
                    className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                  >
                    <Grid2 size={12}>
                      <Typography variant="subtitle1">
                        Address:{" "}
                        <strong>{shortenAddress(order.address)}</strong>
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
                        Fee: <strong>${order.fee}</strong>
                      </Typography>
                    </Grid2>
                    <Grid2 size={12}>
                      <Typography variant="body1">
                        View Order:{" "}
                        <Link
                          href={`${AEON_EXPLORE_WEBURL}/transferInformation?orderNo=${order.orderNo}`}
                        >
                          {shortenAddress(order.orderNo)}
                        </Link>
                      </Typography>
                    </Grid2>
                    <Grid2 size={12}>
                      <Typography variant="body1">
                        Status:{" "}
                        <Chip
                          label={order.orderStatus}
                          color={getOrderStatusColor(order.orderStatus)}
                        />
                      </Typography>
                    </Grid2>
                  </Grid2>
                );
              })}
          {/* <Grid2 size={12} className="w-100 "> */}
            <Card
              className=""
              sx={{
                textAlign: "center",
                borderRadius: "20px",
                py: 2,
                width: "100%",
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
                onClick={() => {refreshOrdersData()}}
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
