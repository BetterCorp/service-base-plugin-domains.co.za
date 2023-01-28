import { SecConfig } from "@bettercorp/service-base";
import { Tools } from "@bettercorp/tools";

export interface DomainsPluginConfig {
  username: string | null;
  key: string | null;
}

export class Config extends SecConfig<DomainsPluginConfig> {
  public override migrate(
    mappedPluginName: string,
    existingConfig: DomainsPluginConfig
  ): DomainsPluginConfig {
    return {
      username:
        !Tools.isNullOrUndefined(existingConfig) &&
        Tools.isString(existingConfig.username)
          ? existingConfig.username
          : null,
      key:
        !Tools.isNullOrUndefined(existingConfig) &&
        Tools.isString(existingConfig.key)
          ? existingConfig.key
          : null,
    };
  }
}
