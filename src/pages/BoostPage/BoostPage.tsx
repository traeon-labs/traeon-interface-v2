import marketplaceAssets from "@/nfts/metadata/nfts.json";
import { IMarketplaceFilterTabs, INFTMetadata, ITabs } from "@/types/index.type";
import { MARKETPLACE_ASSET_CONFIG } from "@/utils/constant";
import { Grid2 } from "@mui/material";
import { Direction } from "@smakss/react-scroll-direction";
import { List } from "@telegram-apps/telegram-ui";
import { useMemo, useState } from "react";
import { BoostCard } from "./BoostCard";
import { BoostCardMain } from "./BoostCardMain";

export const BoostPage = ({
  setVisible,
  setCurrentAsset,
  visible,
  travelMapVisible,
  setTravelMapVisible,
  setTab,
  scrollDir,
}: {
  asset?: INFTMetadata;
  setCurrentAsset: React.Dispatch<
    React.SetStateAction<INFTMetadata | undefined>
  >;
  setTab: React.Dispatch<React.SetStateAction<ITabs>>
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  travelMapVisible: boolean;
  setTravelMapVisible: React.Dispatch<React.SetStateAction<boolean>>;
  scrollDir?: Direction;
}) => {
  const [marketplaceTab, setMarketplaceTab] = useState<IMarketplaceFilterTabs>(
    "mingcute:hat-2-line"
  );

  const marketplaceAssetsFilter = useMemo(() => {
    return marketplaceAssets.reverse().filter((asset) => {
      const typeAttributes = asset.attributes.filter(
        (att) => att.trait_type === "type"
      )[0];
      if (
        MARKETPLACE_ASSET_CONFIG?.[typeAttributes?.value]?.icon ===
        marketplaceTab
      )
        return true;
      return false;
    });
  }, [marketplaceTab]);
  return (
    <List style={{ textAlign: "center" }}>
      {/* <BoostFilter
        marketplaceTab={marketplaceTab}
        setMarketplaceTab={setMarketplaceTab}
        scrollDir={scrollDir}
      /> */}
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <BoostCardMain
            visible={visible}
            setTab={setTab}
            setVisible={setVisible}
            travelMapVisible={travelMapVisible}
            setTravelMapVisible={setTravelMapVisible}
            setCurrentAsset={setCurrentAsset}
            item={marketplaceAssetsFilter.slice(-3)[0]}
          />
        </Grid2>
        {marketplaceAssetsFilter
          .slice(0, 5)
          .map((assetItem: INFTMetadata, _) => {
            return (
              <BoostCard
                travelMapVisible={travelMapVisible}
                setTravelMapVisible={setTravelMapVisible}
                visible={visible}
                setVisible={setVisible}
                setCurrentAsset={setCurrentAsset}
                item={assetItem}
                key={_}
              />
            );
          })}
      </Grid2>
    </List>
  );
};
