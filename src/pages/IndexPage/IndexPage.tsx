import {type FC} from "react";

import {MarketplacePage} from "../MarketplacePage/MarketplacePage";
import {TabsController} from "../MarketplacePage/TabsController";
import "./IndexPage.css";
import {AccountPopover} from "./AccountPropover";
export const IndexPage: FC = () => {
  return (
    <div>
      {/* <AeonPaymentPage/> */}
      {/* <MerchantConfigPage/> */}
      <AccountPopover/>
      <MarketplacePage/>
      <TabsController/>
      {/* <InitDataPage />
      <LaunchParamsPage />
      <ThemeParamsPage /> */}
    </div>
  );
};
