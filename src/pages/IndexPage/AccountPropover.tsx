import type {IconButtonProps} from "@mui/material/IconButton";

import {useCallback,useState} from "react";

import {Iconify} from "@/components/iconify";
import {Card, Chip} from "@mui/material";
import Button from "@mui/material/Button";
import {WalletPropover} from "./AccountPropover/WalletPropover";
import {openAccountOrdersModal} from "./AccountOrdersModal/AccountOrdersModal";
import useAccountOrders from "./AccountOrdersModal/hook/useAccountOrders";

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountPopover() {
  const {pendingOrders} = useAccountOrders()
  return (
    <Card
      sx={{
        position: "sticky",
        zIndex: 1,
        top: 0,
        padding: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
    
      <Button
        color="inherit"
        variant="outlined"
        style={{ border: "none", borderRadius: "20px", textAlign:'center' }}
        onClick={() => {openAccountOrdersModal()}}
        className="aeon-box-border aeon-box-shadow-bold aeon-transition"
        size="large"
      >
        <Iconify sx={{pr:pendingOrders.length > 0 ? 1 : 0 }} icon="fa-solid:list-ul" />
        {pendingOrders.length > 0 ? <Chip sx={{opacity: 0.7, textAlign:'center'}} label={pendingOrders.length} color='error'/>: ""}
      </Button>
      <WalletPropover allowPopover={true}/>
    </Card>
  );
}
