import {Iconify} from "@/components/iconify";
import {IMarketplaceFilterTabs} from "@/types/index.type";
import {MARKETPLACE_FILTERS_TABS} from "@/utils/constant";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

export const MarketplaceFilter = ({marketplaceTab, setMarketplaceTab}: {
  setMarketplaceTab: React.Dispatch<React.SetStateAction<IMarketplaceFilterTabs>>
  marketplaceTab: IMarketplaceFilterTabs
} ) => {
  const handleChange = (event: React.SyntheticEvent, newValue: IMarketplaceFilterTabs) => {
    setMarketplaceTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          centered
          onChange={handleChange}
          aria-label="icon tabs example"
        >
          {Object.keys(MARKETPLACE_FILTERS_TABS).map((_tab: string, _) => {
            return (
              <Tab
                sx={_tab === marketplaceTab ? { borderBottom: "1px solid black" } : {borderBottom: "1px solid white"}}
                className="aeon-transition"
                key={_}
                icon={<Iconify icon={_tab} width={30} height={30} />}
                value={_tab}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
};
