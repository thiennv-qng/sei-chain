import { InjectedConnector } from "@wagmi/connectors/injected";

export class DesigWalletConnector extends InjectedConnector {
  // @ts-ignore
  #private;
  readonly id = "desig";
  // protected shimDisconnectKey: string;
  // constructor({
  //   chains,
  //   options,
  // }?: {
  //   chains?: Chain[];
  //   options?: InjectedConnectorOptions;
  // });
}
