import {createContext,useContext,useEffect,useRef,useState,type FC} from "react";

import {IAeonOrder,INFTMetadata,ITabs} from "@/types/index.type";
import useDetectScroll from "@smakss/react-scroll-direction";
import {init,postEvent} from "@telegram-apps/sdk";
import {AeonPaymentModal} from "../AeonPaymentPage/components/AeonPaymentModal";
import {PaymentConfirmModal} from "../AeonPaymentPage/components/PaymentConfirmModal";
import AssetModal from "../AssetModal/AssetModal";
import {MarketplacePage} from "../MarketplacePage/MarketplacePage";
import {TabsController} from "../MarketplacePage/TabsController";
import {TravelPage} from "../TravelPage/TravelPage";
import {AccountOrdersModal} from "./AccountOrdersModal/AccountOrdersModal";
import {AccountPopover} from "./AccountPropover";
import "./IndexPage.css";

init();
postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });
interface AppContextType {
  orders: IAeonOrder[];
  setOrders: React.Dispatch<React.SetStateAction<IAeonOrder[]>>;
  unfillOrders: IAeonOrder[];
  setUnfillOrders: React.Dispatch<React.SetStateAction<IAeonOrder[]>>;
}

// Create the context with default values (if any)
const AppContext = createContext<AppContextType | undefined>(undefined);

export const IndexPage: FC = () => {
  const [tab, setTab] = useState<ITabs>("mdi:shopping-outline");
  const [assetModal, setAssestModal] = useState<boolean>(false);
  const [travelMapModal, setTravelMapModal] = useState<boolean>(false);
  const [currentAsset, setCurrentAsset] = useState<INFTMetadata | undefined>();
  const customElementRef = useRef<HTMLDivElement>(null);
  const [customElement, setCustomElement] = useState<HTMLDivElement>();
  const { scrollDir } = useDetectScroll({ target: customElement });
  const [orders, setOrders] = useState<IAeonOrder[]>([]);
  const [unfillOrders, setUnfillOrders] = useState<IAeonOrder[]>([]);

  useEffect(() => {
    if (customElementRef.current) {
      setCustomElement(customElementRef.current);
    }
  }, [customElementRef]);
  return (
    <AppContext.Provider value={{ setOrders, orders, setUnfillOrders, unfillOrders }}>
      <div
        ref={customElementRef}
        style={{ overflow: "scroll", height: "100vh" }}
      >
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
        <AeonPaymentModal/>
        <PaymentConfirmModal />
        <AccountOrdersModal setAssestModal={setAssestModal}
          setCurrentAsset={setCurrentAsset}/>
        <TabsController tab={tab} setTab={setTab} scrollDir={scrollDir} />
        <AssetModal
          visible={assetModal}
          setVisible={setAssestModal}
          asset={currentAsset}
          setCurrentAsset={setCurrentAsset}
        />
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};