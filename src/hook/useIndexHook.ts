import {useMemo} from "react";

const useIndexHook = () => {
  const index = useMemo(() => {
    return 0;
  }, []);
  return {
    index,
  };
};

export default useIndexHook;
