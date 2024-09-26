import {AEON_SIGN_KEY} from "@/config";
import {generateSignature} from "@/utils/sign";
import {useMemo} from "react";

const useCreateAeonOrder = ({ data }: { data: Record<string, string> }) => {
  const sign = useMemo(() => {
    return generateSignature(data, AEON_SIGN_KEY)
  },[data]);
  return sign
};

export default useCreateAeonOrder;
