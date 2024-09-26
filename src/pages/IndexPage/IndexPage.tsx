import {type FC} from "react";

import {AeonPaymentPage} from "../AeonPaymentPage/AeonPaymentPage";
import {MerchantConfigPage} from "../MerchantConfigPage/MerchantConfigPage";
import "./IndexPage.css";
import {MarketplacePage} from "../MarketplacePage/MarketplacePage";
import {TabsController} from "../MarketplacePage/TabsController";
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
