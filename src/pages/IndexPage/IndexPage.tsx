import {type FC} from "react";

import {AeonPaymentPage} from "../AeonPaymentPage/AeonPaymentPage";
import {InitDataPage} from "../InitDataPage/InitDataPage";
import {LaunchParamsPage} from "../LaunchParamsPage/LaunchParamsPage";
import {ThemeParamsPage} from "../ThemeParamsPage/ThemeParamsPage";
import "./IndexPage.css";
export const IndexPage: FC = () => {
  return (
    <div>
      <AeonPaymentPage/>
      <InitDataPage />
      <LaunchParamsPage />
      <ThemeParamsPage />
    </div>
  );
};
