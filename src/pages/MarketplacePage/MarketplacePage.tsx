import marketplaceAssets from "@/_mock/metadata/nfts.json";
import { IMarketplaceFilterTabs, INFTMetadata } from "@/types/index.type";
import { Grid2 } from "@mui/material";
import { List } from "@telegram-apps/telegram-ui";
import { FC, useMemo, useState } from "react";
import { AssetCard } from "./AssetCard";
import { MarketplaceFilter } from "./MarketplaceFilter";
import { MARKETPLACE_ASSET_CONFIG } from "@/utils/constant";
export const MarketplacePage = ({
  setVisible,
  setCurrentAsset,
  visible,
}: {
  asset?: INFTMetadata;
  setCurrentAsset: React.Dispatch<
    React.SetStateAction<INFTMetadata | undefined>
  >;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [marketplaceTab, setMarketplaceTab] =
    useState<IMarketplaceFilterTabs>("ph:t-shirt-bold");

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
      <MarketplaceFilter
        marketplaceTab={marketplaceTab}
        setMarketplaceTab={setMarketplaceTab}
      />
      <Grid2 container spacing={3}>
        {marketplaceAssetsFilter.map((assetItem: INFTMetadata, _) => {
          return <AssetCard visible={visible} setVisible={setVisible} setCurrentAsset={setCurrentAsset} item={assetItem} key={_} />;
        })}
      </Grid2>
    </List>
  );
};
