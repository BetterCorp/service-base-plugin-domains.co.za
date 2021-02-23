export enum DomainsCoZaDomainPluginEvents {
  create = 'create',
  delete = 'delete',
  update = 'update',
  renew = 'renew',
  transfer = 'transfer',
  suspend = 'suspend',
  unsuspend = 'unsuspend',
  checkDomainSingleTLD = 'check',
  checkDomainMultipleTLDS = 'check-multi',
  info = 'info',
  updateNameServers = 'update-ns',
  setGlueRecords = 'set-glue',
  getGlueRecords = 'get-glue',
  getNSHostRecords = 'ns-info',
  setNSHostRecords = 'set-ns-info',
  deleteNSHostRecords = 'delete-ns-info',
  setRegistrarLock = 'set-lock',
  getRegistrarLock = 'get-lock',
  getDomainEPPAuthKey = 'get-epp-key',
  cancelDomainUpdate = 'cancel-update',
  cancelDomainDelete = 'cancel-delete',
  cancelDomainTransfer = 'cancel-transfer',
  setDomainAutoRenew = 'set-auto-renew',
  getTransferDomainResponse = 'get-transfer-status',
  getTransferDomainCheck = 'get-transfer-status',
  transfersIn = 'transfers-in',
  transfersOut = 'transfers-out',
  list = 'list',

  resellerInfo = 'reseller-info',
  resellerPrices = 'reseller-prices',
  resellerGetPrices = 'reseller-get-prices',
  resellerSetPrices = 'reseller-set-prices',
  resellerAddCredit = 'reseller-add-credit',
  resellerRemoveCredit = 'reseller-remove-credit'
}

export const POLL_MESSAGE_CODES = [
  {
    code: 3001,
    type: 'contact',
    desc: 'Contact Updated Successful'
  },
  {
    code: 3002,
    type: 'contact',
    desc: 'Empty Update Command'
  },
  {
    code: 4000,
    type: 'nameserver',
    desc: 'First Nameserver Check Failed'
  },
  {
    code: 4001,
    type: 'nameserver',
    desc: 'Consecutive Nameserver Check Failed'
  },
  {
    code: 4002,
    type: 'nameserver',
    desc: 'Nameserver Check Successful'
  },
  {
    code: 4003,
    type: 'update',
    desc: 'Domain Pending Update'
  },
  {
    code: 4004,
    type: 'update',
    desc: 'Domain Update Successful'
  },
  {
    code: 4005,
    type: 'renew',
    desc: 'Domain Renew Successful'
  },
  {
    code: 4006,
    type: 'delete',
    desc: 'Domain Deletion Successful'
  },
  {
    code: 4007,
    type: 'release',
    desc: 'Domain Release Successful'
  },
  {
    code: 4008,
    type: 'delete',
    desc: 'Domain Pending Deletion'
  },
  {
    code: 4009,
    type: 'update',
    desc: 'Pending Update Canceled'
  },
  {
    code: 4010,
    type: 'transfer',
    desc: 'Domain Transfer Request'
  },
  {
    code: 4011,
    type: 'transfer',
    desc: 'Domain Transfer Successful'
  },
  {
    code: 4013,
    type: 'transfer',
    desc: 'Domain Transfer Canceled'
  },
  {
    code: 4014,
    type: 'delete',
    desc: 'Pending Suspension Canceled'
  },
  {
    code: 4016,
    type: 'delete',
    desc: 'Domain Suspended. Pending Deletion'
  },
  {
    code: 4018,
    type: 'transfer',
    desc: 'Domain Transferred Away'
  },
  {
    code: 4019,
    type: 'transfer',
    desc: 'Domain not eligible for transfer'
  },
  {
    code: 4020,
    type: 'delete',
    desc: 'Pending Deletion Canceled'
  },
  {
    code: 4021,
    type: 'update',
    desc: 'Registrant could not be found'
  },
  {
    code: 4022,
    type: 'transfer',
    desc: 'Domain Transfer Rejected'
  },
  {
    code: 4023,
    type: 'transfer',
    desc: 'Domain Transfer will be rejected on expiry ofthe pending update'
  },
  {
    code: 4024,
    type: 'delete',
    desc: 'Domain in closed redemption'
  },
  {
    code: 4025,
    type: 'delete',
    desc: 'Pending Closed Redemption canceled'
  },
  {
    code: 4026,
    type: 'create',
    desc: 'Domain Registration Successful'
  },
  {
    code: 5000,
    type: 'unknown',
    desc: 'Unknown message'
  }
];