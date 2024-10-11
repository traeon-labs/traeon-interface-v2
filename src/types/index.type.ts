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

export type ILocationData = {
  id: string
  type: string
  place_type: Array<string>
  relevance: number
  properties: {
    accuracy: string
  }
  text: string
  place_name: string
  center: Array<number>
  geometry: {
    type: string
    coordinates: Array<number>
  }
  context: Array<{
    id: string
    mapbox_id: string
    wikidata: string
    text: string
    short_code?: string
  }>
}

export type ILocationStore = {
  [id:string]: {
    place_name: string
    center: Array<number>
  }
}

export type IMarkLocations = {
  [key:string]: {
    marks: {
      center: Array<number>,
      place_name: string
    }[]
    color: string
  }
}

export type IAeonResponse = {
  code: string
  msg: string
  model: {
    webUrl: string
    orderNo: string
  }
  traceId: string
  success: boolean
  error: boolean
}
