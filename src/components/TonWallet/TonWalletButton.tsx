import { shortenAddress } from "@/utils";
import { Button, IconContainer, List, Section } from "@telegram-apps/telegram-ui";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { type FC } from "react";

export const TonWalletButton: FC = () => {
  const tonModal = useTonConnectModal();
  const address = useTonAddress();
  const [tonConnect] = useTonConnectUI();
  return (
    <List>
      {!address ? (
        <Button
          className="w-100"
          onClick={() => {
            tonModal.open();
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <div>
          <Button className="w-50" onClick={() => {}}>
            {shortenAddress(address || "")}
          </Button>
          <Button
            className="w-50"
            onClick={() => {
              tonConnect.disconnect();
            }}
          >
            Disconnect
          </Button>
        </div>
      )}
    </List>
  );
};
