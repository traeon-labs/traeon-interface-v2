import { Iconify } from "@/components/iconify";
import { IMarketplaceFilterTabs } from "@/types/index.type";
import { MARKETPLACE_FILTERS_TABS } from "@/utils/constant";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {Direction} from "@smakss/react-scroll-direction";
import * as React from "react";

export const MarketplaceFilter = ({
  marketplaceTab,
  setMarketplaceTab,
  scrollDir,
}: {
  setMarketplaceTab: React.Dispatch<
    React.SetStateAction<IMarketplaceFilterTabs>
  >;
  marketplaceTab: IMarketplaceFilterTabs;
  scrollDir: Direction

}) => {
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: IMarketplaceFilterTabs
  ) => {
    setMarketplaceTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        transition: "0.4s",
        border: "none",
        zIndex: 0,
        // height: '60px',
        // top: , // Propvover Height
        borderRadius: "20px",
        background: "white",
      }}
    >
      <Box>
        <Tabs
          centered
          onChange={handleChange}
          aria-label="icon tabs example"
          sx={{ borderRadius: "20px" }}
        >
          {Object.keys(MARKETPLACE_FILTERS_TABS).map((_tab: string, _) => {
            return (
              <Tab
                sx={
                  _tab === marketplaceTab
                    ? { borderBottom: "1px solid gray" }
                    : { borderBottom: "1px solid white" }
                }
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
