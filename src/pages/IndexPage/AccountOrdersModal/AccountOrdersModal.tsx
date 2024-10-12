import { Iconify } from "@/components/iconify";
import { BorderLinearProgress } from "@/components/Linear/customLinear";
import { INFTMetadata } from "@/types/index.type";
import {createAeonOrdersWithTma} from "@/utils/aeon/createOrder";
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
import {openAeonPayment} from "./AeonPaymentModal";

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
}) => void = () => {};

export const AccountOrdersHistoryModal = () => {
  const [visible, setVisible] = useState(false);
  const resolveRef = useRef<(value: boolean) => void>(() => {
    throw new Error("RESOLVE_REF_UNSET");
  });

  useEffect(() => {
    _confirm = ({
      resolve,
    }: {
      resolve?: (value: boolean) => void;
    }) => {
      if (resolve) resolveRef.current = resolve;
      setVisible(true);
    };
  }, []);

  useEffect(() => {
    if (visible) window.scrollTo(0, 0);
  }, [visible]);

  return (
    <Modal open={visible} trigger={undefined} onOpenChange={setVisible}>
      <Container>
        {/* {isLoading && <SkeletonassetDetails />} */}
      </Container>
    </Modal>
  );
};

export const openPaymentConfirmModal = async (
  asset: INFTMetadata
): Promise<boolean> => {
  return new Promise((resolve) => _confirm({ resolve }));
};
