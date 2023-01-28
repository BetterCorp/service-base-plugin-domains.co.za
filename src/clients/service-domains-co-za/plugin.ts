import {
  ServicesClient,
  ServiceCallable,
  ServicesBase,
} from "@bettercorp/service-base";
import { DomainsCoZaReturnableEvents } from "../../plugins/service-domains-co-za/plugin";
import { DomainsPluginConfig } from "../../plugins/service-domains-co-za/sec.config";
import { DomainCheckResponse } from "../../plugins/service-domains-co-za/domains";

export class domainsCoZa extends ServicesClient<
  ServiceCallable,
  ServiceCallable,
  DomainsCoZaReturnableEvents,
  ServiceCallable,
  ServiceCallable,
  DomainsPluginConfig
> {
  public readonly _pluginName: string = "service-domains-co-za";
  constructor(self: ServicesBase) {
    super(self);
  }

  public async checkDomain(
    sid: string,
    tld: string
  ): Promise<DomainCheckResponse>;
  public async checkDomain(
    sid: string,
    tld: string,
    username: string,
    key: string
  ): Promise<DomainCheckResponse>;
  public async checkDomain(
    sid: string,
    tld: string,
    username?: string,
    key?: string
  ): Promise<DomainCheckResponse> {
    return await this._plugin.emitEventAndReturn(
      "checkDomainSingleTLD",
      sid,
      tld,
      username,
      key
    );
  }

  public async checkDomainTLDs(
    sid: string,
    tlds: Array<string>
  ): Promise<DomainCheckResponse>;
  public async checkDomainTLDs(
    sid: string,
    tlds: Array<string>,
    username: string,
    key: string
  ): Promise<DomainCheckResponse>;
  public async checkDomainTLDs(
    sid: string,
    tlds: Array<string>,
    username?: string,
    key?: string
  ): Promise<DomainCheckResponse> {
    return await this._plugin.emitEventAndReturn(
      "checkDomainMultipleTLDs",
      sid,
      tlds,
      username,
      key
    );
  }
}
