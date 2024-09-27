import { useState, type FC } from "react";

import { MarketplacePage } from "../MarketplacePage/MarketplacePage";
import { TabsController } from "../MarketplacePage/TabsController";
import "./IndexPage.css";
import { AccountPopover } from "./AccountPropover";
import { ITabs } from "@/types/index.type";
export const IndexPage: FC = () => {
  const [tab, setTab] = useState<ITabs>("mdi:location-on-outline");
  return (
    <div>
      {/* <AeonPaymentPage/> */}
      {/* <MerchantConfigPage/> */}

      <AccountPopover />
      {tab === "mdi:shopping-outline" ? (
        <MarketplacePage />
      ) : tab === "akar-icons:thunder" ? (
        "akar"
      ) : tab === "iconamoon:certificate-badge" ? (
        "badge"
      ) : tab === "mdi:location-on-outline" ? (
        "location"
      ) : (
        ""
      )}
      <TabsController tab={tab} setTab={setTab} />
      {/* <InitDataPage />
      <LaunchParamsPage />
      <ThemeParamsPage /> */}
    </div>
  );
};
