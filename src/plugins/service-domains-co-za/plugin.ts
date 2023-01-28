import {
  ServiceCallable,
  ServicesBase,
  IPluginLogger,
} from "@bettercorp/service-base";
import {
  DomainCheckResponse,
  DomainCheckTLDSResponse,
  DomainsGetPricesResponsePrice,
  DomainsCoZa,
} from "./domains";
import { DomainsPluginConfig } from "./sec.config";
import { Tools } from "@bettercorp/tools";

export interface DomainsCoZaReturnableEvents extends ServiceCallable {
  checkDomainSingleTLD(
    domain: string,
    tld: string,
    username?: string,
    key?: string
  ): Promise<DomainCheckResponse>;
  checkDomainMultipleTLDs(
    domain: string,
    tlds: Array<string>,
    username?: string,
    key?: string
  ): Promise<DomainCheckTLDSResponse>;
  getPricing(
    username?: string,
    key?: string
  ): Promise<Array<DomainsGetPricesResponsePrice>>;
}
export class Service extends ServicesBase<
  ServiceCallable,
  ServiceCallable,
  DomainsCoZaReturnableEvents,
  ServiceCallable,
  ServiceCallable,
  DomainsPluginConfig
> {
  constructor(
    pluginName: string,
    cwd: string,
    pluginCwd: string,
    log: IPluginLogger
  ) {
    super(pluginName, cwd, pluginCwd, log);
  }

  private async getDomainsInstance(username?: string, key?: string) {
    const myConfig = await this.getPluginConfig();
    const user = username ?? myConfig.username;
    const uKey = key ?? myConfig.key;
    if (!Tools.isString(user)) throw "Username is not set";
    if (!Tools.isString(uKey)) throw "Key is not set";
    return new DomainsCoZa(user, uKey);
  }
  public override async init() {
    const self = this;
    await this.onReturnableEvent(
      "checkDomainSingleTLD",
      async (domain: string, tld: string, username?: string, key?: string) =>
        await (
          await self.getDomainsInstance(username, key)
        ).checkDomain(domain, tld)
    );

    await this.onReturnableEvent(
      "checkDomainMultipleTLDs",
      async (
        domain: string,
        tlds: Array<string>,
        username?: string,
        key?: string
      ) =>
        await (
          await self.getDomainsInstance(username, key)
        ).checkDomains(domain, tlds)
    );
    await this.onReturnableEvent(
      "getPricing",
      async (username?: string, key?: string) =>
        await (await self.getDomainsInstance(username, key)).getCurrentPrices()
    );

    /*features.onReturnableEvent(
      null,
      DomainsCoZaDomainPluginEvents.create,
      async (resolve, reject, data: any) => {
        if (Tools.isNullOrUndefined(data)) return reject("DATA UNDEFINED");
        if (Tools.isNullOrUndefined(data.domain))
          return reject("DATA [domain] UNDEFINED");
        if (Tools.isNullOrUndefined(data.tld))
          return reject("DATA [tld] UNDEFINED");
        if (Tools.isNullOrUndefined(data.registrantName))
          return reject("DATA [registrantName] UNDEFINED");
        if (Tools.isNullOrUndefined(data.registrantEmail))
          return reject("DATA [registrantEmail] UNDEFINED");
        if (Tools.isNullOrUndefined(data.registrantContactNumber))
          return reject("DATA [registrantContactNumber] UNDEFINED");
        if (Tools.isNullOrUndefined(data.registrantAddress1))
          return reject("DATA [registrantAddress1] UNDEFINED");
        if (Tools.isNullOrUndefined(data.registrantPostalCode))
          return reject("DATA [registrantPostalCode] UNDEFINED");
        if (Tools.isNullOrUndefined(data.registrantCountry))
          return reject("DATA [registrantCountry] UNDEFINED");
        if (Tools.isNullOrUndefined(data.registrantCity))
          return reject("DATA [registrantCity] UNDEFINED");
        if (Tools.isNullOrUndefined(data.ns1))
          return reject("DATA [ns1] UNDEFINED");
        if (Tools.isNullOrUndefined(data.ns2))
          return reject("DATA [ns2] UNDEFINED");
        if (Tools.isNullOrUndefined(data.ns3))
          return reject("DATA [ns3] UNDEFINED");
        if (Tools.isNullOrUndefined(data.ns4))
          return reject("DATA [ns4] UNDEFINED");

        self.domainsCOZA
          .createDomain(
            data.domain,
            data.tld,
            data.registrantName,
            data.registrantEmail,
            data.registrantContactNumber,
            data.registrantAddress1,
            data.registrantAddress2,
            data.registrantPostalCode,
            data.registrantCountry,
            data.registrantCompany,
            data.registrantCity,
            data.registrantProvince,
            data.ns1,
            data.ns2,
            data.ns3,
            data.ns4,
            data.ns5,
            data.ns6,
            data.ns7,
            data.ns8,
            data.ns9,
            data.ns10,
            data.externalRef
          )
          .then((x) => resolve(x))
          .catch((x) => reject(x));
      }
    );*/
  }
}
