import { TickIcon } from "@/components/icons/TickIcon";
import { Card, Tab, Tabs } from "@mui/material";

export const TabsController = () => {
  return (
    <Card sx={{position: 'fixed', width: '80%', marginLeft: '10%', top: '85vh', borderRadius:'20px', background:'rgb(222, 222, 222)'}}>
      <Tabs centered aria-label="icon tabs example" sx={{margin: '0.5rem'}}>
        <Tab icon={<TickIcon />} aria-label="phone" />
        <Tab icon={<TickIcon />} aria-label="favorite" />
        <Tab icon={<TickIcon />} aria-label="person" />
        <Tab icon={<TickIcon />} aria-label="person" />
      </Tabs>
    </Card>
  );
};
