import { PixGateway } from "./PixGateway";
import { PagLoopGateway } from "./gateways/PagLoopGateway";
import { PayFortGateway } from "./gateways/PayFortGateway";
import { IronPayGateway } from "./gateways/IronPayGateway";
import { BlackcatGateway } from "./gateways/BlackcatGateway";

export function getPixGateway(gateway: string): PixGateway {
  switch (gateway) {
    case "pagloop":
      return new PagLoopGateway();

    case "payfort":
      return new PayFortGateway();

    case "blackcat":
      return new BlackcatGateway();

    case "ironpay":
      return new IronPayGateway();

    default:
      throw new Error("Gateway PIX inválido");
  }
}
