import {AEON_SANDBOX_PAYMENTS_BASE_API,AEON_SIGN_KEY} from '@/config';
import axios from 'axios';
import {generateSignature} from '../sign';

// Define the request parameters interface
interface RequestParams {
  appId: string;
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
  sign?: string;
}

// Define the API request function
export async function createAeonOrdersWithTma(params: RequestParams) {
  const requestParams: RequestParams = params

  // Generate the signature
  requestParams.sign = generateSignature(JSON.parse(JSON.stringify(params)), AEON_SIGN_KEY);
  console.log('requestParams', requestParams)
  try {
    const response = await axios.post(`${AEON_SANDBOX_PAYMENTS_BASE_API}/open/api/tgPayment`, requestParams, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
