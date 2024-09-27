import marketplaceAssets from "@/_mock/metadata/nfts.json";
import {INFTMetadata} from "@/types/index.type";
import {Box,Card,Container,Divider,Tab,Tabs} from "@mui/material";
import {useMemo,useState} from "react";
import {useParams} from "react-router-dom";

export default function DN404DetailsPage() {

  const { id } = useParams();
  const asset: INFTMetadata = useMemo(() => {
    return marketplaceAssets.filter(asset => asset.name === id)[0]
  },[id])
  const [currentTab, setCurrentTab] = useState('trade_history');

  const TABS = [
    {
      value: "trade_history",
      label: `Trade history`,
      component: asset ? 'history' : null,
    },
    {
      value: "description",
      label: "description",
      component: asset ? 'description' : null,
    },
  ];

  return (
    <>
      <Container>
        {/* <CustomBreadcrumbs
          heading={`${asset?.name.split(" ")[0].toUpperCase()} / (${
            asset?.name
          })`}
          links={[
            {
              name: LAICOS_DEFINE_FAIRLAUNCH,
            },
          ]}
        /> */}

        {/* <CartWidget totalItems={checkout.totalItems} /> */}

        {asset && (
          <>
            {/* <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={7}>
                <DN404DetailsCarousel asset={asset} />
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <DN404DetailsSummary
                  asset={asset}
                  cart={checkout.cart}
                  onAddCart={handleAddCart}
                  onGotoStep={handleGotoStep}
                />
              </Grid>
            </Grid> */}

            <Box
              gap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              sx={{ my: 1 }}
            >
            </Box>

            <Card>
              <Tabs
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                sx={{ px: 3, bgcolor: "background.neutral" }}
              >
                {TABS.map((tab) => (
                  <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
              </Tabs>

              <Divider />

              {TABS.map(
                (tab) =>
                  tab.value === currentTab && (
                    <Box
                      key={tab.value}
                      sx={{
                        ...(currentTab === "description" && {
                          p: 3,
                        }),
                      }}
                    >
                      {tab.component}
                    </Box>
                  )
              )}
            </Card>
          </>
        )}

        {/* {isLoading && <SkeletonassetDetails />} */}
      </Container>
    </>
  );
}
