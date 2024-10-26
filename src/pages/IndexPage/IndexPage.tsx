import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";

import {
  IAeonOrder,
  ILocationStore,
  IMarkLocations,
  INFTMetadata,
  ITabs,
} from "@/types/index.type";
import useDetectScroll from "@smakss/react-scroll-direction";
import { init, postEvent, cloudStorage } from "@telegram-apps/sdk";
import { AeonPaymentModal } from "../AeonPaymentPage/components/AeonPaymentModal";
import { PaymentConfirmModal } from "../AeonPaymentPage/components/PaymentConfirmModal";
import AssetModal from "../AssetModal/AssetModal";
import { MarketplacePage } from "../MarketplacePage/MarketplacePage";
import { TabsController } from "../MarketplacePage/TabsController";
import { TravelPage } from "../TravelPage/TravelPage";
import { AccountOrdersModal } from "./AccountOrdersModal/AccountOrdersModal";
import { AccountPopover } from "./AccountPropover";
import "./IndexPage.css";
import { MainLoading } from "./MainLoading";
import useLocationStorage from "@/hook/useLocationStorage";
import { BadgePage } from "../BadgePage/BadgePage";
import { BoostPage } from "../BoostPage/BoostPage";
import { PaymentSellModal } from "../AeonPaymentPage/components/PaymentSellModal";
import { TravelMapModal } from "../TravelPage/TravelMapModal";

init();
postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });

interface AppContextType {
  orders: IAeonOrder[];
  setOrders: React.Dispatch<React.SetStateAction<IAeonOrder[]>>;
  unfillOrders: IAeonOrder[];
  setUnfillOrders: React.Dispatch<React.SetStateAction<IAeonOrder[]>>;
  visitedLocations: {
    markLocations: IMarkLocations;
    journeysData: {
      [key: string]: ILocationStore;
    };
    journeyKeys: string[];
  };
  setVisitedLocations: React.Dispatch<
    React.SetStateAction<{
      markLocations: IMarkLocations;
      journeysData: {
        [key: string]: ILocationStore;
      };
      journeyKeys: string[];
    }>
  >;
}

// Create the context with default values (if any)
const AppContext = createContext<AppContextType | undefined>(undefined);

export const IndexPage: FC = () => {
  const [tab, setTab] = useState<ITabs>("mdi:location-on-outline");
  const [assetModal, setAssestModal] = useState<boolean>(false);
  const [travelMapModal, setTravelMapModal] = useState<boolean>(false);
  const [currentAsset, setCurrentAsset] = useState<INFTMetadata | undefined>();
  const customElementRef = useRef<HTMLDivElement>(null);
  const [customElement, setCustomElement] = useState<HTMLDivElement>();
  // const { scrollDir } = useDetectScroll({ target: customElement });
  const [visitedLocations, setVisitedLocations] = useState<{
    markLocations: IMarkLocations;
    journeysData: { [key: string]: ILocationStore };
    journeyKeys: string[];
  }>({
    markLocations: {},
    journeyKeys: [],
    journeysData: {},
  });
  const [orders, setOrders] = useState<IAeonOrder[]>([]);
  const [unfillOrders, setUnfillOrders] = useState<IAeonOrder[]>([]);

  useEffect(() => {
    if (customElementRef.current) {
      setCustomElement(customElementRef.current);
    }
  }, [customElementRef]);
  return (
    <AppContext.Provider
      value={{
        setOrders,
        orders,
        setUnfillOrders,
        unfillOrders,
        setVisitedLocations,
        visitedLocations,
      }}
    >
      <div
        ref={customElementRef}
        style={{ overflow: "scroll", height: "100vh" }}
      >
        {/* <AeonPaymentPage/> */}
        {/* <MerchantConfigPage/> */}
        {/* <MainLoading /> */}
        <AccountPopover />
        {tab === "mdi:shopping-outline" ? (
          <MarketplacePage
            setCurrentAsset={setCurrentAsset}
            visible={assetModal}
            setVisible={setAssestModal}
            asset={currentAsset}
          />
        ) : tab === "akar-icons:thunder" ? (
          <BoostPage
            setCurrentAsset={setCurrentAsset}
            setTab={setTab}
            visible={assetModal}
            setVisible={setAssestModal}
            travelMapVisible={travelMapModal}
            setTravelMapVisible={setTravelMapModal}
            asset={currentAsset}
          />
        ) : tab === "iconamoon:certificate-badge" ? (
          <BadgePage visible={travelMapModal} setVisible={setTravelMapModal} />
        ) : tab === "mdi:location-on-outline" ? (
          <TravelPage visible={travelMapModal} setVisible={setTravelMapModal} />
        ) : (
          ""
        )}
        <TravelMapModal
          visible={travelMapModal}
          setVisible={setTravelMapModal}
        />
        <AeonPaymentModal />
        <PaymentSellModal />
        <PaymentConfirmModal />
        <AccountOrdersModal
          setAssestModal={setAssestModal}
          setCurrentAsset={setCurrentAsset}
        />
        {!travelMapModal ? <TabsController tab={tab} setTab={setTab} /> : ""}
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
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
