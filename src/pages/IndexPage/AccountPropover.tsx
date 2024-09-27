import type { IconButtonProps } from "@mui/material/IconButton";

import { useCallback, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Iconify } from "@/components/iconify";
import { Card, Chip } from "@mui/material";
import {
  useTonAddress,
  useTonConnectModal,
  useTonWallet,
} from "@tonconnect/ui-react";
import { shortenAddress } from "@/utils";

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountPopover({
  data = [],
  sx,
  ...other
}: AccountPopoverProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleClosePopover();
      console.log(path);
      //   router.push(path);
    },
    [handleClosePopover]
  );
  const tonWallet = useTonWallet();
  const tonWalletAddress = useTonAddress();
  const tonWalletModal = useTonConnectModal();
  return (
    <Card
      sx={{
        padding: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {tonWalletAddress ? (
        <div>
          <Button
            color="inherit"
            variant="outlined"
            style={{ border: "1px solid gray" }}
            size="small"
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
              ...sx,
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

              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
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
                startIcon={<Iconify icon="ant-design:disconnect-outlined" />}
                size="medium"
                variant="text"
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
          startIcon={
            <Iconify icon="material-symbols-light:account-balance-wallet-outline" />
          }
          sx={{
            borderRadius: "20px",
            ...sx,
          }}
        >
          Connect Wallet
        </Button>
      )}
        <Button
          color="inherit"
          variant="outlined"
          style={{ border: 'none', borderRadius:'20px'}}
          size='large'
        >
            <Iconify  icon='fa-solid:list-ul'/>
        </Button>
    </Card>
  );
}
