import {generateSignature} from "@/utils/sign";
import {useMemo} from "react";

const useSignSHA512 = ({ data }: { data: Record<string, string> }) => {
  const sign = useMemo(() => {
    return generateSignature(data)
  },[data]);
  return sign
};

export default useSignSHA512;
