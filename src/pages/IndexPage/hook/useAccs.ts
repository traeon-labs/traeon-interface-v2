import {useMemo} from "react";

const useAccs = () => {
  const index = useMemo(() => {
    return 0;
  }, []);
  return {
    index,
  };
};

export default useAccs;
