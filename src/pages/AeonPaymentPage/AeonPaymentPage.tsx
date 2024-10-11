import {TonWalletButton} from "@/components/TonWallet/TonWalletButton";
import useSignSHA512 from "@/pages/AeonPaymentPage/hook/useSignSHA512";
import {createAeonOrdersWithTma} from "@/utils/aeon/createOrder";
import {generateSignature} from "@/utils/sign";
import {Button,Cell,List,Section} from "@telegram-apps/telegram-ui";
import {type FC} from "react";
import {openAeonPayment} from "./components/AeonPaymentModal";

// const signParams = JSON.parse(
//   JSON.stringify({
//     appId: "CPM202410081058",
//     // sign: "TEST000001", // Excluded from signature generation
//     merchantOrderNo: "11126",
//     userId: "505884978@qq.com",
//     orderAmount: "1000",
//     payCurrency: "USD",
//     paymentTokens: "USDT,ETH",
//     paymentExchange:
//       "16f021b0-f220-4bbb-aa3b-82d423301957,9226e5c2-ebc3-4fdd-94f6-ed52cdce1420",
//   })
// );
export const AeonPaymentPage: FC = () => {
  const createOrdersTelegram = async () => {
    try {
      const res = await createAeonOrdersWithTma({
        merchantOrderNo: "3",
        orderAmount: '200', // 10U
        payCurrency: 'USD',
        userId: "vindz@qq.com",
        paymentExchange: "3b43c82c-8ead-4533-9e39-0bf433b6a321",
        paymentTokens: "USDT,ETH",
      })
      console.log(res)
      if(res) openAeonPayment(res)
    } catch (error) {
      console.log(error)
    }
  
  };
  return (
    <List>
      <Section header="Aeon Payments">
        <TonWalletButton/>
        <Cell>Clothes</Cell>
        <Button className="w-100" onClick={createOrdersTelegram}>
          Pay with Aeon $1
        </Button>
      </Section>
    </List>
  );
};
