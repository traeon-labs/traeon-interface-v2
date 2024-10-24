import marketplaceAssets from "@/nfts/metadata/nfts.json";
import {IMarketplaceFilterTabs,INFTMetadata} from "@/types/index.type";
import {MARKETPLACE_ASSET_CONFIG} from "@/utils/constant";
import {Grid2} from "@mui/material";
import {Direction} from "@smakss/react-scroll-direction";
import {List} from "@telegram-apps/telegram-ui";
import {useMemo,useState} from "react";
import {BoostFilter} from "./BoostFilter";
import {BoostCard} from "./BoostCard";

export const BoostPage = ({
  setVisible,
  setCurrentAsset,
  visible,
  scrollDir
}: {
  asset?: INFTMetadata;
  setCurrentAsset: React.Dispatch<
    React.SetStateAction<INFTMetadata | undefined>
  >;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  scrollDir?: Direction

}) => {
  const [marketplaceTab, setMarketplaceTab] =
    useState<IMarketplaceFilterTabs>('mingcute:hat-2-line');

  const marketplaceAssetsFilter = useMemo(() => {
    return marketplaceAssets.filter((asset) => {
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
      <BoostFilter
        marketplaceTab={marketplaceTab}
        setMarketplaceTab={setMarketplaceTab}
        scrollDir={scrollDir}
      />
      <Grid2 container spacing={3}>
        {marketplaceAssetsFilter.map((assetItem: INFTMetadata, _) => {
          return <BoostCard visible={visible} setVisible={setVisible} setCurrentAsset={setCurrentAsset} item={assetItem} key={_} />;
        })}
      </Grid2>
    </List>
  );
};
