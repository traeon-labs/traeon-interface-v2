import {generateSignature} from "@/utils/sign";
import {useMemo} from "react";

const useCreateAeonOrder = ({ data }: { data: Record<string, string> }) => {
  const sign = useMemo(() => {
    return generateSignature(data)
  },[data]);
  return sign
};

export default useCreateAeonOrder;
