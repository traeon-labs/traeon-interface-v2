import marketplaceAssets from "@/_mock/metadata/nfts.json";
import { IMarketplaceFilterTabs, INFTMetadata } from "@/types/index.type";
import { Grid2 } from "@mui/material";
import { List } from "@telegram-apps/telegram-ui";
import { FC, useState } from "react";
import { AssetCard } from "./AssetCard";
import { MarketplaceFilter } from "./MarketplaceFilter";
export const MarketplacePage: FC = () => {
  const [marketplaceTab, setMarketplaceTab] =
    useState<IMarketplaceFilterTabs>("ph:t-shirt-bold");
  return (
    <List style={{ textAlign: "center" }}>
      <MarketplaceFilter
        marketplaceTab={marketplaceTab}
        setMarketplaceTab={setMarketplaceTab}
      />
      <Grid2 container spacing={3}>
        {marketplaceAssets.map((assetItem: INFTMetadata, _) => {
          return <AssetCard item={assetItem} key={_} />;
        })}
      </Grid2>
    </List>
  );
};
