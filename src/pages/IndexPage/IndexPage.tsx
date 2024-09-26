import {type FC} from "react";

import {MarketplacePage} from "../MarketplacePage/MarketplacePage";
import {TabsController} from "../MarketplacePage/TabsController";
import "./IndexPage.css";
export const IndexPage: FC = () => {
  return (
    <div>
      {/* <AeonPaymentPage/>
      <MerchantConfigPage/> */}
      <MarketplacePage/>
      <TabsController/>
      {/* <InitDataPage />
      <LaunchParamsPage />
      <ThemeParamsPage /> */}
    </div>
  );
};
