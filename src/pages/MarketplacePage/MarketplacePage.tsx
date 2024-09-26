import marketplaceAssets from "@/_mock/metadata/nfts.json";
import {INFTMetadata} from "@/types/index.type";
import {Grid2} from "@mui/material";
import {List} from "@telegram-apps/telegram-ui";
import {FC} from "react";
import {AssetCard} from "./AssetCard";
import {MarketplaceFilter} from "./MarketplaceFilter";
export const MarketplacePage: FC = () => {
  return (
    <List style={{textAlign:'center'}}>
        <MarketplaceFilter/>
        <Grid2 container spacing={3}>
          {marketplaceAssets.map((assetItem: INFTMetadata, _) => {
            return (
                <AssetCard item={assetItem}  key={_}/>
            );
          })}
        </Grid2>
    </List>
  );
};
