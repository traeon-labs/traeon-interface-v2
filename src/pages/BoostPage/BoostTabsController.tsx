import {Iconify} from "@/components/iconify";
import {ITabs} from "@/types/index.type";
import {TABS} from "@/utils/constant";
import {Card,Tab,Tabs} from "@mui/material";
import {Direction} from "@smakss/react-scroll-direction";

export const BoostTabsController = ({
  tab,
  setTab,
  scrollDir
}: {
  setTab: React.Dispatch<React.SetStateAction<ITabs>>;
  tab: ITabs;
  scrollDir?: Direction
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectTab = (_:any, newTab: ITabs) => {
    setTab(newTab);
  };
  return (
    <Card
      sx={{
        cursor: 'pointer',
        position: "fixed",
        width: "80%",
        marginLeft: "10%",
        marginBottom: scrollDir === Direction.Down ? '-5rem' : '0',
        transition: '0.4s',
        bottom: "1rem",
        borderRadius: "20px",
        background: "rgb(230, 230, 230)",
      }}
    >
      <Tabs
        onChange={onSelectTab}
        centered
        aria-label="icon tabs example"
        sx={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
      >
        {Object.keys(TABS).map((_tab: string, _) => {
          return (
            <Tab
              sx={
                _tab === tab
                  ? { borderBottom: "1px solid black" }
                  : { borderBottom: "1px solid rgb(230, 230, 230)" }
              }
              className="aeon-transition"
              key={_}
              icon={<Iconify icon={_tab} width={30} height={30} />}
              value={_tab}
            />
          );
        })}
      </Tabs>
    </Card>
  );
};
