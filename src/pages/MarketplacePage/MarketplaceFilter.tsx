import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const MarketplaceFilter = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box >
        <Tabs value={value} centered onChange={handleChange} aria-label="basic tabs example">
          <Tab label="T-shirt" {...a11yProps(0)} />
          <Tab label="Short" {...a11yProps(1)} />
          <Tab label="Socks" {...a11yProps(2)} />
          <Tab label="Bag" {...a11yProps(3)} />
          <Tab label="Hats" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
