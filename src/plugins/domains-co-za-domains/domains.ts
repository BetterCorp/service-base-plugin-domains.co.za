import _AXIOS from 'axios';
import * as qs from 'qs';
const AXIOS = _AXIOS as any;

export class DomainsCoZa {
  private username: string;
  private key: string;

  private webRequest<T = any> (path: string, data: Object | undefined = undefined): Promise<T> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      const url = `https://api-v3.domains.co.za/api/${path}`;
      AXIOS({
        url,
        method: 'POST',
        data: qs.stringify({
          username: self.username,
          key: self.key,
          ...(data || {})
        })
      }).then((x: any) => resolve(x.data)).catch(reject);
    });
  }

  constructor(username: string, key: string) {
    this.username = username;
    this.key = key;
  }

  createDomain (domain: string, tld: string,
    registrantName: string,
    registrantEmail: string,
    registrantContactNumber: string,
    registrantAddress1: string,
    registrantAddress2: string = '',
    registrantPostalCode: string,
    registrantCountry: string,
    registrantCompany: string = '',
    registrantCity: string,
    registrantProvince: string = '',
    ns1: string,
    ns2: string,
    ns3: string,
    ns4: string,
    ns5: string,
    ns6: string,
    ns7: string,
    ns8: string,
    ns9: string,
    ns10: string,
    externalRef: string
  ): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/create', {
        sld: domain,
        tld: tld,
        registrantName,
        registrantEmail,
        registrantContactNumber,
        registrantAddress1,
        registrantAddress2,
        registrantPostalCode,
        registrantCountry,
        registrantCompany,
        registrantCity,
        registrantProvince,
        period: 1,
        dns: 'custom',
        ns1,
        ns2,
        ns3,
        ns4,
        ns5,
        ns6,
        ns7,
        ns8,
        ns9,
        ns10,
        externalRef,
      }).then(resolve).catch(reject);
    });
  }

  checkDomain (domain: string, tld: string): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/check', {
        sld: domain,
        tld: tld
      }).then(resolve).catch(reject);
    });
  }

  checkDomains (domain: string, tlds: Array<string>): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/checkTlds', {
        sld: domain,
        tlds: tlds.join(';')
      }).then(resolve).catch(reject);
    });
  }

  deleteDomain (domain: string, tld: string): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/delete', {
        sld: domain,
        tld: tld
      }).then(resolve).catch(reject);
    });
  }

  updateDomain (domain: string, tld: string,
    contactName: string,
    contactEmail: string,
    contactContactNumber: string,
    contactAddress1: string,
    contactAddress2: string = '',
    contactPostalCode: string,
    contactCountry: string,
    contactCompany: string,
    contactCity: string,
    contactProvince: string,
  ): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/update', {
        sld: domain,
        tld: tld,
        contactName,
        contactEmail,
        contactContactNumber,
        contactAddress1,
        contactAddress2,
        contactPostalCode,
        contactCountry,
        contactCompany,
        contactCity,
        contactProvince,
      }).then(resolve).catch(reject);
    });
  }

  renewDomain (domain: string, tld: string): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/renew', {
        sld: domain,
        tld: tld,
        period: 1
      }).then(resolve).catch(reject);
    });
  }

  transferDomain (domain: string, tld: string,
    registrantName: string,
    registrantEmail: string,
    registrantContactNumber: string,
    registrantAddress1: string,
    registrantAddress2: string = '',
    registrantPostalCode: string,
    registrantCountry: string,
    registrantCompany: string = '',
    registrantCity: string,
    registrantProvince: string = '',
    eppKey: string,
    ns1: string,
    ns2: string,
    ns3: string,
    ns4: string,
    ns5: string,
    ns6: string,
    ns7: string,
    ns8: string,
    ns9: string,
    ns10: string,
    externalRef: string
  ): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/transfer', {
        sld: domain,
        tld: tld,
        registrantName,
        registrantEmail,
        registrantContactNumber,
        registrantAddress1,
        registrantAddress2,
        registrantPostalCode,
        registrantCountry,
        registrantCompany,
        registrantCity,
        registrantProvince,
        dns: 'custom',
        eppKey,
        ns1,
        ns2,
        ns3,
        ns4,
        ns5,
        ns6,
        ns7,
        ns8,
        ns9,
        ns10,
        externalRef,
      }).then(resolve).catch(reject);
    });
  }

  suspendDomain (domain: string, tld: string): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/suspend', {
        sld: domain,
        tld: tld,
      }).then(resolve).catch(reject);
    });
  }

  unsuspendDomain (domain: string, tld: string): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/unsuspend', {
        sld: domain,
        tld: tld,
      }).then(resolve).catch(reject);
    });
  }

  getCurrentPrices (): Promise<Array<any> | any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/reseller/getPrices/format/tld').then((x: any) => {
        let domainsListWithUpdatedPricing: Array<any> = [];
        for (let tldName of Object.keys(x.arrPrices)) {
          let tld = x.arrPrices[tldName];
          if (tld.optedOut) continue;

          domainsListWithUpdatedPricing.push({
            tld: tldName,
            registration: Number.parseFloat(`${tld.registration}`),
            renewal: Number.parseFloat(`${tld.renewal}`),
            premium: Number.parseFloat(`${tld.premium}`),
            transfer: Number.parseFloat(`${tld.transfer}`),
            redemption: Number.parseFloat(`${tld.redemption}`),
          });
        }
        resolve(domainsListWithUpdatedPricing);
      }).catch(reject);
    });
  }

  domainInfo (domain: string, tld: string): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/info', {
        sld: domain,
        tld: tld,
      }).then(resolve).catch(reject);
    });
  }

  updateNameServers (domain: string, tld: string,
    ns1: string,
    ns2: string,
    ns3: string,
    ns4: string,
    ns5: string,
    ns6: string,
    ns7: string,
    ns8: string,
    ns9: string,
    ns10: string): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/nsUpdate', {
        sld: domain,
        tld: tld,
        dns: 'custom',
        ns1,
        ns2,
        ns3,
        ns4,
        ns5,
        ns6,
        ns7,
        ns8,
        ns9,
        ns10,
      }).then(resolve).catch(reject);
    });
  }

  checkTransferStatus (domain: string, tld: string): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/transferCheck', {
        sld: domain,
        tld: tld,
      }).then(resolve).catch(reject);
    });
  }

  getTransfersIn (order: string, startPoint: number, limit: number, search: number): Promise<any> {
    const self = this;
    return new Promise(async (resolve, reject) => {
      self.webRequest('domain/domain/transferInList', {
        order,
        startPoint,
        limit,
        search,
      }).then(resolve).catch(reject);
    });
  }
}