import useSignSHA512 from "@/pages/AeonPaymentPage/hook/useSignSHA512";
import {createAeonOrdersWithTma} from "@/utils/aeon/createOrder";
import {Button,Cell,List,Section} from "@telegram-apps/telegram-ui";
import {type FC} from "react";
const params = JSON.parse(
  JSON.stringify({
    appId: "TEST000001",
    // sign: "TEST000001", // Excluded from signature generation
    merchantOrderNo: "11126",
    userId: "505884978@qq.com",
    orderAmount: "1000",
    payCurrency: "USD",
    paymentTokens: "USDT,ETH",
    paymentExchange:
      "16f021b0-f220-4bbb-aa3b-82d423301957,9226e5c2-ebc3-4fdd-94f6-ed52cdce1420",
  })
);
export const AeonPaymentPage: FC = () => {
  const sign = useSignSHA512({ data: params });
  const createOrdersTelegram = async () => {
    const params = {
      appId: "6fdbaac29eb94bc6b12345ad705e9293",
      callbackURL: "https://crypto-payment-sbx.aeon.cc/crypto/bot/cpCallback",
      customParam:
        '{"botName":"ABCDCryptoPaymentTestBot","orderDetail":"ABDC Test BAG 🎒","chatId":"6831529261"}',
      expiredTime: "999999",
      merchantOrderNo: "17243134568514",
      orderAmount: "10",
      orderModel: "ORDER",
      payCurrency: "USD",
      sign: "TEST000001",
      tgModel: "MINIAPP",
      userId: "5123456978@qq.com",
    };
    try {
      const res = await createAeonOrdersWithTma(params)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  
  };
  return (
    <List>
      <Section header="Aeon Payments">
        <Cell>Clothes</Cell>
        <Button className="w-100" onClick={createOrdersTelegram}>
          Pay with Aeon $1
        </Button>
        {sign}
      </Section>
    </List>
  );
};
