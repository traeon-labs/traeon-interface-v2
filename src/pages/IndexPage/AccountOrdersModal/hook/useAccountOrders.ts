import { IAeonOrder } from "@/types/index.type";
import { fetchAeonOrder } from "@/utils/aeon/fetchOrder";
import { useCloudStorage } from "@tma.js/sdk-react";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../IndexPage";

const useAccountOrders = () => {
  const cloudData = useCloudStorage(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const { orders, setOrders } = useAppContext();
  const pendingOrders = useMemo(() => {
    return orders.filter(
      (o) => o?.orderStatus === "INIT" || o.orderStatus === "PROCESSING"
    );
  }, [orders]);
  const fetchOrdersFromStorage = async () => {
    setLoadingOrders(true);
    const orderStorageKeys = (await cloudData.getKeys()).filter(
      (key) => key.split("_")?.[0] === "order"
    );
    const ordersDataRaw = await cloudData.get(orderStorageKeys);
    const ordersData = Object.keys(ordersDataRaw).map((key) => {
      return JSON.parse(ordersDataRaw[key]) as IAeonOrder;
    });
    if (ordersData) {
      setOrders(ordersData);
    }
    setLoadingOrders(false);
    return ordersData;
  };
  const refreshOrdersData = async () => {
    setLoadingOrders(true);
    try {
      const orderStorageKeys = (await cloudData.getKeys()).filter(
        (key) => key.split("_")?.[0] === "order"
      );
      const ordersData = await Promise.all(
        orderStorageKeys.map(async (orderKey) => {
          return (
            await fetchAeonOrder({ merchantOrderNo: orderKey.split("_")[1] })
          )?.model;
        })
      );
      if (ordersData)
        setOrders(ordersData.filter((o) => o !== undefined) as IAeonOrder[]);
      Promise.all(
        ordersData.map(async (orderData) => {
          if (orderData?.orderNo) {
            await cloudData.set(
              `order_${orderData.merchantOrderNo}`,
              JSON.stringify(orderData)
            );
          }
        })
      );
      console.log("#ordersData", ordersData);
      setLoadingOrders(false);
    } catch (error) {
      console.log(error);
      setLoadingOrders(false);
    }
  };
  useEffect(() => {
    refreshOrdersData();
  }, [cloudData]);
  return {
    loadingOrders,
    setLoadingOrders,
    orders,
    pendingOrders,
    fetchOrdersFromStorage,
    refreshOrdersData,
  };
};

export default useAccountOrders;
