import { Iconify } from "@/components/iconify";
import { IAeonResponse } from "@/types/index.type";
import { Container, Grid2, IconButton } from "@mui/material";
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
    <Modal open={visible} trigger={undefined} onOpenChange={setVisible}>
      {/* <Container
        sx={{ height: "100vh", alignItems: "center", textAlign: "center" }}
      > */}
        <Grid2 container sx={{ borderRadius: '20px'}}>
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
            <div style={{ marginTop: 0 }}>
              <IconButton
                size="large"
                sx={{
                  borderRadius: "50%",
                  background: 'white',
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
            <iframe
              style={{ marginLeft: 0,height: "100vh", borderRadius: '20px', width: '100vw', border: 'none' }}
              src={
                "https://sbx-crypto-payment.alchemypay.org/?orderNum=300217285661440940802"
              }
            />
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
