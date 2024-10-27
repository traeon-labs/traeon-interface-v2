import {IAeonResponse, OrderStatus} from "@/types/index.type";

export function shortenAddress(address:string, startLen = 4, endLen = 4): string {
    // Validate that the input is a valid Ethereum address
    // if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    //   return address
    // }
  
    // Extract the first 4 and last 4 characters of the address
    const start = address.slice(0, 2+startLen);
    const end = address.slice(-endLen);
  
    // Combine them with an ellipsis in the middle
    return `${start}...${end}`;
  }
  
  export function getAccIndex(key:string): number {
    return Number(key.split('-')[1]);
  }

  export function getStorageKey(index:number): string {
    return `wallet-` + index;
  }

  export function numberToOrdinal(n: number): string {
    if (n < 1) {
      return '1st';
    }
    
    if (n % 10 === 1 && n % 100 !== 11) {
      return `${n}st`;
    } else if (n % 10 === 2 && n % 100 !== 12) {
      return `${n}nd`;
    } else if (n % 10 === 3 && n % 100 !== 13) {
      return `${n}rd`;
    } else {
      return `${n}th`;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function toFixed(x: any): string {
    if (Math.abs(x) < 1.0) {
      // eslint-disable-next-line no-var
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = String('0.' + (new Array(e)).join('0') + x.toString().substring(2));
      }
    } else {
      // eslint-disable-next-line no-var
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x = String(x + (new Array(e + 1)).join('0'));
      }
    }
    return x;
  }
  export const zerofy = (value: number, minZeroDecimal: number = 4): string => {
    const x = value
    const countZeroAfterDot = -Math.floor(Math.log10(x) + 1)
    if (
      Number.isFinite(countZeroAfterDot) &&
      countZeroAfterDot >= minZeroDecimal
    ) {
      const ucZeros = String.fromCharCode(
        parseInt(`+208${countZeroAfterDot}`, 16)
      )
      return x
        .toLocaleString('fullwide', {
          maximumSignificantDigits: 4,
          maximumFractionDigits: 18
        })
        .replace(/[.,]{1}0+/, `.0${ucZeros}`)
    }
    return value.toLocaleString('fullwide', {
      maximumSignificantDigits: 4,
      maximumFractionDigits: 18
    })
  }

export function generateColorHex(input: string, opacity: number = 0.9): string {
  // Create a hash code from the string
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash); // Simple hash function
  }

  // Extract RGB components from the hash
  const r = (hash & 0x00FF0000) >> 16;
  const g = (hash & 0x0000FF00) >> 8;
  const b = (hash & 0x000000FF);

  // Convert opacity to a hex value (0-255)
  const a = Math.round(opacity * 255).toString(16).padStart(2, '0'); // Convert to hex and ensure it's two digits

  // Return the hex color string with alpha
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}${a}`;
}
export function getCurrentDateFormatted() {
  const date = new Date();
  return date.toISOString().slice(0, 10)
}

export function fromCurrentDateFormatted(pickDate: string) {
  const date = new Date()
  pickDate += date.toISOString().slice(10)
  return new Date(pickDate)
}

export function timestampToDateFormatted(timestamp: number): string {
  const date = new Date(timestamp * 86400000); // Convert days to milliseconds
  return date.toISOString().slice(0, 10)
}


export function encodeLocationKey(contry?:string, region?: string) {
  return btoa(contry+'-'+region);
}

// Function to decode a Base64 string
export function decodeLocationkey(encoded:string) {
  return atob(encoded).split('-');
}

function generateDigitRandom(): number {
  return Math.floor(10000 + Math.random() * 90000);
}

export const generateOrderKey = (tgUserId?:string, merNoOrder?: string) => {
  let _merNoOrder  = merNoOrder
  if(!_merNoOrder) _merNoOrder = String(generateDigitRandom())
  return `${tgUserId}-${_merNoOrder}`
}
export const encodeOrderKey = (tgUserId:string, merNoOrder?: string) => {
  return `${tgUserId}-${merNoOrder}`
}
export const decodeOrderKey = (orderMerKey: string) => {
  return orderMerKey.split('-')
}
export const getOrderStatusColor = (status:OrderStatus) => {
  switch (status) {
    case "INIT":
      return "info"; // Waiting for user payment
    case "PROCESSING":
      return "warning"; // During the payment process
    case "COMPLETED":
      return "success"; // Payment success
    case "CLOSE":
      return "default"; // Payment close
    case "TIMEOUT":
      return "error"; // Payment cancel
    case "FAILED":
      return "error"; // Payment failure
    case "DELAY_SUCCESS":
      return "success"; // Overtime payment success
    case "DELAY_FAILED":
      return "error"; // Overtime payment failed
    default:
      return "default";
  }
};
export function generateFractionalPrice(item: string, factor?: number): number {
  // Convert the string into a sum of ASCII values of the characters
  let asciiSum = 0;
  for (let i = 0; i < item.length; i++) {
    asciiSum += item.charCodeAt(i);
  }

  // Use the factor if provided, otherwise default to 1
  const adjustmentFactor = factor !== undefined ? factor : 1;

  // Normalize the price to a fraction between 0 and 4, adjusted by the factor
  const maxAsciiSum = 1000; // Arbitrary large value to limit price range
  let normalizedPrice = (asciiSum % maxAsciiSum) / maxAsciiSum * 4;

  // Adjust the price with the optional factor
  normalizedPrice *= adjustmentFactor;

  // Ensure the result is still within 0 < price < 4
  normalizedPrice = Math.min(Math.max(normalizedPrice, 0), 4);

  return Number(normalizedPrice);
}

export const generateAeonResError =(msg: string, code: string): IAeonResponse => {
  return {
    code,
    msg,
    traceId: '',
    model: {
      webUrl: '',
      orderNo: ''
    },
    success: false,
    error: false
  }
}
export function decodeTimestampAgo(timestamp?: number, clean = false): string {
  if (!timestamp) return "0";
  const currentTime = Date.now();
  const difference = currentTime - timestamp;

  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerHour = 60 * millisecondsPerMinute;
  const millisecondsPerDay = 24 * millisecondsPerHour;

  const days = Math.floor(difference / millisecondsPerDay);
  const hours = Math.floor(
    (difference % millisecondsPerDay) / millisecondsPerHour,
  );
  const minutes = Math.floor(
    (difference % millisecondsPerHour) / millisecondsPerMinute,
  );

  const daysText =
    days > 0 ? `${days}${clean ? "d" : ` day${days !== 1 ? "s" : ""}`}` : "";
  const hoursText =
    hours > 0
      ? `${hours}${clean ? "h" : ` hour${hours !== 1 ? "s" : ""}`}`
      : "";
  const minutesText =
    minutes > 0
      ? `${minutes}${clean ? "m" : ` min${minutes !== 1 ? "s" : ""}`}`
      : "";

  if (days > 0) {
    return `${daysText} ${hoursText} ago`;
  } else if (hours > 0) {
    return `${hoursText} ${minutesText} ago`;
  } else {
    return `${minutesText === "" ? '1m' : minutesText} ago`;
  }
}
