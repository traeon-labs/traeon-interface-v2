import { AEON_SANDBOX_PAYMENTS_BASE_API, AEON_SIGN_KEY } from "@/config";
import axios from "axios";
import { generateSignature } from "../sign";
import { IAeonResponse } from "@/types/index.type";
// Define the request parameters interface
interface RequestParams {
  merchantOrderNo: string;
  orderAmount: string;
  payCurrency: string;
  userId: string;
  paymentExchange?: string;
  paymentTokens?: string;
  redirectURL?: string;
  callbackURL?: string;
  customParam?: string;
  expiredTime?: string;
  payType?: string;
  paymentNetworks?: string;
  orderModel?: string;
  tgModel?: string;
  // for Traeon
}

// Define the API request function
export async function createAeonOrdersWithTma(
  params: RequestParams,
  customParams: {[key:string]: any} = {}
): Promise<IAeonResponse | undefined> {
  const requestParams: any = params;
  requestParams.appId = import.meta.env.VITE_AEON_APP_ID;
  requestParams.sign = generateSignature(JSON.parse(JSON.stringify(params)));
  const _customParams: {[key:string]: any} = customParams
  _customParams.orderTs = String(Date.now());
  requestParams.customParam = JSON.stringify(_customParams);
  console.log(requestParams);
  try {
    const response = await axios.post(
      `${AEON_SANDBOX_PAYMENTS_BASE_API}/open/api/payment`,
      requestParams,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)
    const aeonResponse: IAeonResponse = response.data;
    return aeonResponse;
  } catch (error) {
    console.error("Error:", error);
  }
}
