import { ILocationStore, IMarkLocations } from "@/types/index.type";
import { decodeLocationkey, generateColorHex } from "@/utils";
// import { useCloudStorage } from "@tma.js/sdk-react";
import { cloudStorage as cloudData } from "@telegram-apps/sdk";
import { useEffect, useState, useCallback } from "react";

const useLocationStorage = () => {
  // const cloudData = useCloudStorage(false);
  const [visitedLocations, setVisitedLocations] = useState<{
    markLocations: IMarkLocations;
    journeysData: { [key: string]: ILocationStore };
    journeyKeys: string[];
  }>({
    markLocations: {},
    journeyKeys: [],
    journeysData: {}
  });
  useEffect(()=> {
    console.log(visitedLocations.markLocations)
  },[visitedLocations])
  const fetchJourney = async (data?: {
    markLocations: IMarkLocations;
    journeysData: { [key: string]: ILocationStore };
    journeyKeys: string[];
  }) => {
    if(data) {setVisitedLocations(data);return}
    const keys = await cloudData.getKeys();
    const journeyKeys = keys.filter(key => !key.startsWith('order') && decodeLocationkey(key).length > 0);
    const journeysData = await cloudData.getItem(journeyKeys);
    const journeysDataEncode: { [key: string]: ILocationStore } = {};
    const markLocations: IMarkLocations = {};

    journeyKeys.forEach((key) => {
      const journeyData: ILocationStore = JSON.parse(journeysData[key]);
      journeysDataEncode[key] = journeyData;

      if (!markLocations[key]) {
        markLocations[key] = { marks: [], color: generateColorHex(key) };
      }

      Object.keys(journeyData).forEach(jkey => {
        markLocations[key].marks.push(
          {
            center: journeyData[jkey].center,
            place_name: journeyData[jkey].place_name
      });
      });
    });

    setVisitedLocations({
      markLocations,
      journeysData: journeysDataEncode,
      journeyKeys,
    });
  };

  useEffect(() => {
    fetchJourney(); // Fetch data on initial mount
  }, []);

  return { ...visitedLocations, refresh: fetchJourney }; // Return refresh function
};

export default useLocationStorage;
