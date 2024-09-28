import type { IconButtonProps } from "@mui/material/IconButton";

import { useCallback, useState } from "react";

import { Iconify } from "@/components/iconify";
import { shortenAddress } from "@/utils";
import { Card, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

export function WalletPropover({ allowPopover }: { allowPopover: boolean }) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (allowPopover) setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const tonWallet = useTonWallet();
  const tonWalletAddress = useTonAddress();
  const tonWalletModal = useTonConnectModal();
  const tonWalletUI = useTonConnectUI();

  return tonWalletAddress ? (
    <div>
      <Button
        color="inherit"
        variant="outlined"
        style={{ border: "1px solid gray", color: "black" }}
        size="small"
        className="aeon-box-border aeon-box-shadow-bold aeon-transition"
        onClick={handleOpenPopover}
        startIcon={
          <div>
            <Chip
              sx={{ background: "none" }}
              icon={<Iconify icon="token-branded:usdt" />}
              size="small"
              label="20"
            />
            <Chip
              sx={{ background: "none" }}
              size="small"
              icon={<Iconify icon="token-branded:ton" />}
              label="20"
            />
          </div>
        }
        sx={{
          borderRadius: "20px",
        }}
      >
        {shortenAddress(tonWalletAddress)}
      </Button>
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{left: 100}}
        slotProps={{
          paper: {
            sx: { borderRadius: "20px", width: 200 },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {shortenAddress(tonWalletAddress)}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            Chain ID: {tonWallet?.account.chain}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
              [`&.${menuItemClasses.selected}`]: {
                color: "text.primary",
                bgcolor: "action.selected",
                fontWeight: "fontWeightSemiBold",
              },
            },
          }}
        >
          <MenuItem
            key={"copy"}
            onClick={() => {
              navigator.clipboard.writeText(tonWalletAddress);
            }}
          >
            <Iconify icon={"ion:copy-outline"} />
            Copy address
          </MenuItem>
          <MenuItem
            key={"copy"}
            //   onClick={() => handleClickItem(option.href)}
          >
            <Iconify icon={"hugeicons:profile"} />
            Manage
          </MenuItem>
        </MenuList>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            color="error"
            startIcon={<Iconify icon="material-symbols-light:account-balance-wallet-outline" />}
            size="medium"
            variant="text"
            onClick={async () => {
              await tonWalletUI[0].disconnect()
            }}
          >
            Disconnect
          </Button>
        </Box>
      </Popover>
    </div>
  ) : (
    <Button
      onClick={() => {
        tonWalletModal.open();
      }}
      color="inherit"
      variant="outlined"
      className="aeon-box-border aeon-box-shadow-bold aeon-transition"
      startIcon={
        <Iconify icon="token:ton" />
      }
      sx={{
        borderRadius: "20px",
      }}
    >
      Connect Wallet
    </Button>
  );
}
