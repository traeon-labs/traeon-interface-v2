import {type FC} from "react";

import {AeonPaymentPage} from "../AeonPaymentPage/AeonPaymentPage";
import {MarketplacePage} from "../MarketplacePage/MarketplacePage";
import {MerchantConfigPage} from "../MerchantConfigPage/MerchantConfigPage";
import "./IndexPage.css";
export const IndexPage: FC = () => {
  return (
    <div>
      <AeonPaymentPage/>
      <MerchantConfigPage/>
      <MarketplacePage/>
      {/* <InitDataPage />
      <LaunchParamsPage />
      <ThemeParamsPage /> */}
    </div>
  );
};
