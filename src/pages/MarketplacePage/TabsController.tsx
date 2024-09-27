import {Iconify} from "@/components/iconify";
import { TickIcon } from "@/components/icons/TickIcon";
import {ITabs} from "@/types/index.type";
import {TABS} from "@/utils/constant";
import { Card, Tab, Tabs } from "@mui/material";

export const TabsController = ({tab, setTab}: {
  setTab: React.Dispatch<React.SetStateAction<ITabs>>
  tab: ITabs
} ) => {
  const onSelectTab = (_, newTab:ITabs) => {
    setTab(newTab)
  }
  return (
    <Card sx={{position: 'fixed', width: '80%', marginLeft: '10%', bottom: '1rem', borderRadius:'20px', background:'rgb(230, 230, 230)'}}>
      <Tabs onChange={onSelectTab} centered aria-label="icon tabs example" sx={{marginBottom: '0.5rem', marginTop: '0.5rem'}}>
        {Object.keys(TABS).map((tab:string, _) => {
          return  <Tab key={_} icon={<Iconify icon={tab} width={30} height={30} />} value={tab}/>

        })}
      </Tabs>
    </Card>
  );
};
