import { SUPPORTED_CHAIN_IDS } from './chains'
import polygonMaticLogoUrl from '../assets/svg/polygon_matic_logo.svg'
import ethereumLogoUrl from '../assets/svg/eth_logo.svg'

/**
 * Chain specific contract details
 */
// Modeled on Uniswap's implementation: https://github.com/Uniswap/interface/blob/b501974a763b9c99e69007e8b00d1b21a4e7094b/src/constants/chainInfo.ts
export const CONTRACT_ADDRESS = {
    [SUPPORTED_CHAIN_IDS.ROPSTEN]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [SUPPORTED_CHAIN_IDS.RINKEBY]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    [SUPPORTED_CHAIN_IDS.KOVAN]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
    [SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
}

export const CHAIN_INFO = {
    [SUPPORTED_CHAIN_IDS.ROPSTEN]: {
        explorer: 'https://ropsten.etherscan.io/',
        label: 'Ropsten',
        logoUrl: ethereumLogoUrl,
        addNetworkInfo: {
          nativeCurrency: { name: 'Ropsten Ether', symbol: 'ropETH', decimals: 18 },
        }
    },
    [SUPPORTED_CHAIN_IDS.RINKEBY]: {
        explorer: 'https://rinkeby.etherscan.io/',
        label: 'Rinkeby',
        logoUrl: ethereumLogoUrl,
        addNetworkInfo: {
          nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
        }
    },
    [SUPPORTED_CHAIN_IDS.KOVAN]: {
        explorer: 'https://kovan.etherscan.io/',
        label: 'Kovan',
        logoUrl: ethereumLogoUrl,
        addNetworkInfo: {
          nativeCurrency: { name: 'Kovan Ether', symbol: 'kovETH', decimals: 18 },
        }
    },
    [SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]: {
        docs: 'https://polygon.io/',
        explorer: 'https://mumbai.polygonscan.com/',
        label: 'Polygon Mumbai',
        logoUrl: polygonMaticLogoUrl,
        addNetworkInfo: {
          nativeCurrency: { name: 'Polygon Mumbai Matic', symbol: 'mMATIC', decimals: 18 },
        }
    }
}