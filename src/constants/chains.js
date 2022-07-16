
/**
 * List of all supported networks
 */

export const SUPPORTED_CHAIN_IDS = {
    ROPSTEN: 3,
    RINKEBY: 4,
    KOVAN: 42,

    POLYGON_MUMBAI: 80001
}

export const CHAIN_IDS_TO_NAMES = {
    [SUPPORTED_CHAIN_IDS.ROPSTEN]: 'ropsten',
    [SUPPORTED_CHAIN_IDS.RINKEBY]: 'rinkeby',
    [SUPPORTED_CHAIN_IDS.KOVAN]: 'kovan',
    [SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]: 'polygon_mumbai',
}