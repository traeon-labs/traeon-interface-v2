import { useEffect, useState, type FC } from "react";

import { INFTMetadata, ITabs } from "@/types/index.type";
import { AeonPaymentModal } from "../AeonPaymentPage/components/AeonPaymentModal";
import AssetModal from "../AssetModal/AssetModal";
import { MarketplacePage } from "../MarketplacePage/MarketplacePage";
import { TabsController } from "../MarketplacePage/TabsController";
import { TravelPage } from "../TravelPage/TravelPage";
import { AccountPopover } from "./AccountPropover";
import "./IndexPage.css";
import { init, backButton, postEvent } from '@telegram-apps/sdk';
init()
postEvent('web_app_setup_swipe_behavior', {allow_vertical_swipe: false})
export const IndexPage: FC = () => {
  const [tab, setTab] = useState<ITabs>("mdi:location-on-outline");
  const [assetModal, setAssestModal] = useState<boolean>(false);
  const [travelMapModal, setTravelMapModal] = useState<boolean>(false);
  const [currentAsset, setCurrentAsset] = useState<INFTMetadata | undefined>();
  useEffect(() => {
    console.log(assetModal);
  }, [assetModal]);
  return (
    <div>
      {/* <AeonPaymentPage/> */}
      {/* <MerchantConfigPage/> */}

      <AccountPopover />
      {tab === "mdi:shopping-outline" ? (
        <MarketplacePage
          setCurrentAsset={setCurrentAsset}
          visible={assetModal}
          setVisible={setAssestModal}
          asset={currentAsset}
        />
      ) : tab === "akar-icons:thunder" ? (
        "akar"
      ) : tab === "iconamoon:certificate-badge" ? (
        "badge"
      ) : tab === "mdi:location-on-outline" ? (
        <TravelPage visible={travelMapModal} setVisible={setTravelMapModal} />
      ) : (
        ""
      )}
      <AeonPaymentModal />
      <TabsController tab={tab} setTab={setTab} />
      <AssetModal
        visible={assetModal}
        setVisible={setAssestModal}
        asset={currentAsset}
        setCurrentAsset={setCurrentAsset}
      />
    </div>
  );
};
