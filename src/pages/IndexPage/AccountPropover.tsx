import type {IconButtonProps} from "@mui/material/IconButton";

import {useCallback,useState} from "react";

import {Iconify} from "@/components/iconify";
import {Card} from "@mui/material";
import Button from "@mui/material/Button";
import {WalletPropover} from "./AccountPropover/WalletPropover";
import {openAccountOrdersModal} from "./AccountOrdersModal/AccountOrdersModal";

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountPopover() {
  
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
        style={{ border: "none", borderRadius: "20px" }}
        onClick={() => {openAccountOrdersModal()}}
        size="large"
      >
        <Iconify icon="fa-solid:list-ul" />
      </Button>
      <WalletPropover allowPopover={true}/>
    </Card>
  );
}
