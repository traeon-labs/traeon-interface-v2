import { useEffect, useState, type FC } from "react";

import { MarketplacePage } from "../MarketplacePage/MarketplacePage";
import { TabsController } from "../MarketplacePage/TabsController";
import "./IndexPage.css";
import { AccountPopover } from "./AccountPropover";
import { INFTMetadata, ITabs } from "@/types/index.type";
import AssetModal from "../AssetModal/AssetModal";
import {TravelPage} from "../TravelPage/TravelPage";
export const IndexPage: FC = () => {
  const [tab, setTab] = useState<ITabs>('mdi:location-on-outline');
  const [assetModal, setAssestModal] = useState<boolean>(false);
  const [currentAsset, setCurrentAsset] = useState<INFTMetadata | undefined>()
  useEffect(() => {
    console.log(assetModal)
  },[assetModal])
  return (
    <div>
      {/* <AeonPaymentPage/> */}
      {/* <MerchantConfigPage/> */}

      <AccountPopover />
      {tab === "mdi:shopping-outline" ? (
        <MarketplacePage  setCurrentAsset={setCurrentAsset} visible={assetModal} setVisible={setAssestModal} asset={currentAsset}/>
      ) : tab === "akar-icons:thunder" ? (
        "akar"
      ) : tab === "iconamoon:certificate-badge" ? (
        "badge"
      ) : tab === "mdi:location-on-outline" ? (
        <TravelPage/>
      ) : (
        ""
      )}
      <TabsController tab={tab} setTab={setTab} />
      <AssetModal visible={assetModal} setVisible={setAssestModal} asset={currentAsset} setCurrentAsset={setCurrentAsset}/> 
    </div>
  );
};
