import { Iconify } from "@/components/iconify";
import { IAeonResponse } from "@/types/index.type";
import {
  Button,
  Card,
  Chip,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { Modal } from "@telegram-apps/telegram-ui";
import { useEffect, useRef, useState } from "react";

let _confirm: (props: {
  resolve?: (value: boolean) => void;
  aeonResponse: IAeonResponse;
}) => void = () => {};

export const AeonPaymentModal = () => {
  const [visible, setVisible] = useState(false);
  const [aeonResponse, setAeonResponse] = useState<IAeonResponse>();
  const resolveRef = useRef<(value: boolean) => void>(() => {
    throw new Error("RESOLVE_REF_UNSET");
  });

  useEffect(() => {
    _confirm = ({
      resolve,
      aeonResponse,
    }: {
      resolve?: (value: boolean) => void;
      aeonResponse: IAeonResponse;
    }) => {
      if (resolve) resolveRef.current = resolve;
      setVisible(true);
      setAeonResponse(aeonResponse);
    };
  }, []);

  useEffect(() => {
    if (visible) window.scrollTo(0, 0);
  }, [visible]);

  return (
    <Modal
      open={visible}
      style={{ maxHeight: "100vh" }}
      trigger={undefined}
      onOpenChange={setVisible}
    >
      {/* <Container
        sx={{ height: "100vh", alignItems: "center", textAlign: "center" }}
      > */}
      <Grid2
        container
        sx={{
          height: aeonResponse?.model?.webUrl ? "100vh" : "auto",
          borderRadius: "20px",
          marginBottom: "0.5rem",
        }}
      >
        <Grid2
          size={12}
          sx={{
            position: aeonResponse?.model?.webUrl ? "fixed" : "sticky",
            display: "flex",
            zIndex: 10,
            top: 0,
            justifyContent: "space-between",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            paddingLeft: "0.5rem",
          }}
        >
          <div style={{ marginTop: 0 }}>
            <IconButton
              size="large"
              sx={{
                borderRadius: "50%",
                background: "white",
              }}
              className="aeon-box-shadow-bold aeon-transition"
              onClick={() => {
                setVisible(false);
              }}
            >
              <Iconify icon="ic:outline-arrow-back-ios" width={20} />
            </IconButton>{" "}
          </div>
        </Grid2>
        <Grid2 size={12} className="w-100 aeon-box-shadow aeon-box-border">
          {aeonResponse?.model?.webUrl ? (
            <iframe
              style={{
                marginLeft: 0,
                height: "100vh",
                borderRadius: "20px",
                width: "100vw",
                border: "none",
              }}
              src={aeonResponse?.model?.webUrl}
            />
          ) : (
            <Card
              className=""
              sx={{
                textAlign: "center",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",

                marginBottom: "1rem",
                borderRadius: "20px",
                width: "100%",
              }}
            >
              <Typography sx={{ paddingBottom: "0.5rem" }}>
                <Chip
                  variant="outlined"
                  color="error"
                  label={aeonResponse?.code}
                />{" "}
                {aeonResponse?.msg}
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  setVisible(false);
                }}
                startIcon={<Iconify icon="uil:cancel" />}
                className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                sx={{ width: "48%", marginRight: "1%", marginLeft: "1%" }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={
                  <Iconify icon={"material-symbols:pending-actions"} />
                }
                className="aeon-box-border aeon-box-shadow-bold aeon-transition"
                sx={{ width: "48%", marginLeft: "1%", marginRight: "1%" }}
              >
                Pending Orders
              </Button>
            </Card>
          )}
        </Grid2>
      </Grid2>
      {/* </Container> */}
    </Modal>
  );
};

export const openAeonPayment = async (
  aeonResponse: IAeonResponse
): Promise<boolean> => {
  return new Promise((resolve) => _confirm({ resolve, aeonResponse }));
};
