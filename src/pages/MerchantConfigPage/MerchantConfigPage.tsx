import { Button, Cell, List, Section } from "@telegram-apps/telegram-ui";
import type { FC } from "react";

export const MerchantConfigPage: FC = () => {
  return (
    <List>
      <Section header="Aeon Payments">
        <Cell>Merchant</Cell>
        <Button className="w-100">View Merchant</Button>
      </Section>
    </List>
  );
};
