import { IMarketplaceFilterTabs, IMUIColor, ITabs } from "@/types/index.type";

export const TABS: { [key: string]: string } = {
  "mdi:location-on-outline": "travel",
  "akar-icons:thunder": "boost",
  "iconamoon:certificate-badge": "badge",
  "mdi:shopping-outline": "store",
};

export const MARKETPLACE_FILTERS_TABS: { [key: string]: string } = {
  "ph:t-shirt-bold": "t-shirts",
  "lucide-lab:shorts": "shorts",
  "ph:sock-bold": "socks",
  "ph:bag-bold": "bags",
  "mingcute:hat-2-line": "hats",
};

export const MARKETPLACE_ASSET_CONFIG: {
  [key: string]: { icon: IMarketplaceFilterTabs; label: string; color: IMUIColor };
} = {
  "t-shirts": {
    icon: "ph:t-shirt-bold",
    label: "T-Shirt",
    color: "primary",
  },
  shorts: {
    icon: "lucide-lab:shorts",
    label: "Short",
    color: "success",
  },
  socks: {
    icon: "ph:sock-bold",
    label: "Sock",
    color: "inherit",
  },
  hats: {
    icon: "mingcute:hat-2-line",
    label: "Hat",
    color: "error",
  },
  bags: {
    icon: "ph:bag-bold",
    label: "Bag",
    color: "secondary",
  },
};

export const DEFAULT_LOCATION = [-7.2842, 41.6941]