export const KITE_CONFIG = {
  network: "kite_testnet",
  rpcUrl: "https://rpc-testnet.gokite.ai",
  chainId: 2368,
  bundlerUrl: "https://bundler-service.staging.gokite.ai/rpc/",
  /** 支付使用的代币："KITE" = 原生 KITE 测试币；"USDT" = 测试网 USDT（ERC20） */
  paymentToken: process.env.PAYMENT_TOKEN || "USDT",
  /** Kite 测试网 USDT 合约地址（仅当 paymentToken === "USDT" 时使用） */
  usdtContractAddress: process.env.KITE_TESTNET_USDT_ADDRESS || "0x0fF5393387ad2f9f691FD6Fd28e07E3969e27e63",
};
