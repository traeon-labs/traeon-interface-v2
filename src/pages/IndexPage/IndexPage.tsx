import {type FC} from "react";

import {AeonPaymentPage} from "../AeonPaymentPage/AeonPaymentPage";
import "./IndexPage.css";
import {MerchantConfigPage} from "../MerchantConfigPage/MerchantConfigPage";
export const IndexPage: FC = () => {
  return (
    <div>
      <AeonPaymentPage/>
      <MerchantConfigPage/>
      {/* <InitDataPage />
      <LaunchParamsPage />
      <ThemeParamsPage /> */}
    </div>
  );
};
