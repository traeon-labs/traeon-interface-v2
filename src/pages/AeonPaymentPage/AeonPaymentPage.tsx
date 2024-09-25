import useSignSHA512 from "@/hook/useSign";
import {Button,Cell,List,Section} from "@telegram-apps/telegram-ui";
import {type FC} from "react";
const params = JSON.parse(JSON.stringify({
  appId: "TEST000001",
  // sign: "TEST000001", // Excluded from signature generation
  merchantOrderNo: "11126",
  userId: "505884978@qq.com",
  orderAmount: "1000",
  payCurrency: "USD",
  paymentTokens: "USDT,ETH",
  paymentExchange:
    "16f021b0-f220-4bbb-aa3b-82d423301957,9226e5c2-ebc3-4fdd-94f6-ed52cdce1420",
}));
export const AeonPaymentPage: FC = () => {
  const sign = useSignSHA512({data: params})
  return (
    <List>
      <Section header="Aeon Payments">
        <Cell>Clothes</Cell>
        <Button className="w-100">Pay with Aeon $1</Button>
        {sign}
        {/* <Cell subtitle={error ? error : sign}>
          <Typography>
            Hash
          </Typography>
        </Cell> */}
      </Section>
    </List>
  );
};
