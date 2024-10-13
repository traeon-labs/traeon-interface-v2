import {useEffect,useRef,useState,type FC} from "react";

import {INFTMetadata,ITabs} from "@/types/index.type";
import useDetectScroll from "@smakss/react-scroll-direction";
import {init,postEvent} from '@telegram-apps/sdk';
import {AeonPaymentModal} from "../AeonPaymentPage/components/AeonPaymentModal";
import {PaymentConfirmModal} from "../AeonPaymentPage/components/PaymentConfirmModal";
import AssetModal from "../AssetModal/AssetModal";
import {MarketplacePage} from "../MarketplacePage/MarketplacePage";
import {TabsController} from "../MarketplacePage/TabsController";
import {TravelPage} from "../TravelPage/TravelPage";
import {AccountPopover} from "./AccountPropover";
import "./IndexPage.css";
import {fetchAeonOrder} from "@/utils/aeon/fetchOrder";
import {useInitData} from "@tma.js/sdk-react";
import {AccountOrdersModal} from "./AccountOrdersModal/AccountOrdersModal";

init()
postEvent('web_app_setup_swipe_behavior', {allow_vertical_swipe: false})
export const IndexPage: FC = () => {
  const [tab, setTab] = useState<ITabs>("mdi:shopping-outline");
  const [assetModal, setAssestModal] = useState<boolean>(false);
  const [travelMapModal, setTravelMapModal] = useState<boolean>(false);
  const [currentAsset, setCurrentAsset] = useState<INFTMetadata | undefined>();
  const customElementRef = useRef<HTMLDivElement>(null);
  const [customElement, setCustomElement] = useState<HTMLDivElement>();
  const {scrollDir} = useDetectScroll({target: customElement});
  useEffect(() => {
    if(customElementRef.current) {
      setCustomElement(customElementRef.current);
    }
  }, [customElementRef])
  return (
    <div ref={customElementRef} style={{overflow: 'scroll', height: '100vh'}}>
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
      <PaymentConfirmModal/>
      <AccountOrdersModal/>
      <TabsController tab={tab} setTab={setTab} scrollDir={scrollDir}/>
      <AssetModal
        visible={assetModal}
        setVisible={setAssestModal}
        asset={currentAsset}
        setCurrentAsset={setCurrentAsset}
      />
    </div>
  );
};
