export type INFTMetadata = {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
};
export type ITabs =
  | "mdi:location-on-outline"
  | "akar-icons:thunder"
  | "iconamoon:certificate-badge"
  | "mdi:shopping-outline";
export type IMarketplaceFilterTabs =
  | "ph:t-shirt-bold"
  | "lucide-lab:shorts"
  | "ph:sock-bold"
  | "ph:bag-bold"
  | "mingcute:hat-2-line";

export type IMUIColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
