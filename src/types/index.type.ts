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
export interface IAeonOrder  {
  orderNo: string;                 // AEON order number, max length 64
  orderStatus: OrderStatus;        // Order status, max length 32
  userId: string;                  // User ID (email or phone number), max length 128
  merchantOrderNo: string;         // Merchant order number, max length 64
  orderCurrency: string;           // Currency of order (USD/EUR), max length 32
  orderAmount: string;             // Amount of order (in cents), max length 16
  payCryptoRate: string;           // Rate of payment crypto (to USDT), max length 16
  payFiatRate: string;             // Rate of payment fiat (to USD), max length 16
  payCryptoCurrency: string;       // Cryptocurrency of payment, max length 32
  payCryptoVolume: string;         // Cryptocurrency payment amount, max length 16
  payCryptoNetwork: string;        // Cryptocurrency payment network, max length 32
  address: string;                 // Address for user transfer, max length 256
  hxAddress: string;               // Hash address, max length 256
  failReason?: string;             // Fail reason (optional), max length 256
  fee?: string;                    // Transaction fee (optional), max length 16
  customParam?: string; // Expend parameter, max length 512
  settlementAmount: string;        // Amount of settlement, max length 16
  settlementCurrency: string;      // Currency of settlement, max length 16
}
// Response Parameter Interface
export interface AeonOrderResponse {
  code: string
  msg: string
  model: IAeonOrder,
  traceId: string
  success: boolean
  error: boolean
}

// Enum for Order Status Codes
export enum OrderStatus {
  INIT = "INIT",                   // Waiting for user payment
  PROCESSING = "PROCESSING",       // During the payment process
  COMPLETED = "COMPLETED",         // Payment success
  CLOSE = "CLOSE",                 // Payment close
  TIMEOUT = "TIMEOUT",             // Payment cancel
  FAILED = "FAILED",               // Payment failure
  DELAY_SUCCESS = "DELAY_SUCCESS", // Order overtime and payment success
  DELAY_FAILED = "DELAY_FAILED"    // Order overtime and payment failed
}
