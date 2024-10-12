import axios from "axios";
import {generateSignature} from "../sign";
import {AEON_SANDBOX_PAYMENTS_BASE_API} from "@/config";
import {AeonOrderResponse} from "@/types/index.type";

// Define the request parameters interface
interface getOrderRequestParams {
    merchantOrderNo: string
  }
  
  
  export async function fetchAeonOrder(params: getOrderRequestParams): Promise<AeonOrderResponse | undefined> {
    const requestParams:any = params
    requestParams.appId = import.meta.env.VITE_AEON_APP_ID
    requestParams.sign = generateSignature(JSON.parse(JSON.stringify(params)));
    console.log('requestParams', requestParams)
    try {
      const response = await axios.post(`${AEON_SANDBOX_PAYMENTS_BASE_API}/open/api/payment/query`, requestParams, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const aeonResponse: AeonOrderResponse = response.data;
      console.log(aeonResponse)
      return aeonResponse
    } catch (error) {
      console.error('Error:', error);
    }
  }