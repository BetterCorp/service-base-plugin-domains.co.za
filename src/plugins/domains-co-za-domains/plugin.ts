import { IPlugin, PluginFeature } from '@bettercorp/service-base/lib/ILib';
import { DomainsCoZaDomainPluginEvents } from '../../lib';
import { DomainsCoZa } from './domains';
import { Tools } from '@bettercorp/tools/lib/Tools';

export class Plugin implements IPlugin {
  private domainsCOZA!: DomainsCoZa;

  init (features: PluginFeature): Promise<void> {
    const self = this;
    return new Promise((resolve) => {
      self.domainsCOZA = new DomainsCoZa(features.getPluginConfig().username, features.getPluginConfig().key);

      features.onReturnableEvent(null, DomainsCoZaDomainPluginEvents.checkDomainSingleTLD, async (resolve, reject, data: any) => {
        if (Tools.isNullOrUndefined(data)) return reject('DATA UNDEFINED');
        if (Tools.isNullOrUndefined(data.domain)) return reject('DATA [domain] UNDEFINED');
        if (Tools.isNullOrUndefined(data.tld)) return reject('DATA [tld] UNDEFINED');

        self.domainsCOZA.checkDomain(data.domain, data.tld).then(x => resolve(x)).catch(x => reject(x));
      });

      features.onReturnableEvent(null, DomainsCoZaDomainPluginEvents.checkDomainMultipleTLDS, async (resolve, reject, data: any) => {
        if (Tools.isNullOrUndefined(data)) return reject('DATA UNDEFINED');
        if (Tools.isNullOrUndefined(data.domain)) return reject('DATA [domain] UNDEFINED');

        self.domainsCOZA.checkDomains(data.domain, data.tlds).then(x => resolve(x)).catch(x => reject(x));
      });

      features.onReturnableEvent(null, DomainsCoZaDomainPluginEvents.create, async (resolve, reject, data: any) => {
        if (Tools.isNullOrUndefined(data)) return reject('DATA UNDEFINED');
        if (Tools.isNullOrUndefined(data.domain)) return reject('DATA [domain] UNDEFINED');
        if (Tools.isNullOrUndefined(data.tld)) return reject('DATA [tld] UNDEFINED');
        if (Tools.isNullOrUndefined(data.registrantName)) return reject('DATA [registrantName] UNDEFINED');
        if (Tools.isNullOrUndefined(data.registrantEmail)) return reject('DATA [registrantEmail] UNDEFINED');
        if (Tools.isNullOrUndefined(data.registrantContactNumber)) return reject('DATA [registrantContactNumber] UNDEFINED');
        if (Tools.isNullOrUndefined(data.registrantAddress1)) return reject('DATA [registrantAddress1] UNDEFINED');
        if (Tools.isNullOrUndefined(data.registrantPostalCode)) return reject('DATA [registrantPostalCode] UNDEFINED');
        if (Tools.isNullOrUndefined(data.registrantCountry)) return reject('DATA [registrantCountry] UNDEFINED');
        if (Tools.isNullOrUndefined(data.registrantCity)) return reject('DATA [registrantCity] UNDEFINED');
        if (Tools.isNullOrUndefined(data.ns1)) return reject('DATA [ns1] UNDEFINED');
        if (Tools.isNullOrUndefined(data.ns2)) return reject('DATA [ns2] UNDEFINED');
        if (Tools.isNullOrUndefined(data.ns3)) return reject('DATA [ns3] UNDEFINED');
        if (Tools.isNullOrUndefined(data.ns4)) return reject('DATA [ns4] UNDEFINED');

        self.domainsCOZA.createDomain(data.domain, data.tld,
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
        ).then(x => resolve(x)).catch(x => reject(x));
      });

      resolve();
    });
  }
}