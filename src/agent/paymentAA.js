// import pkg from "gokite-aa-sdk";
// import { ethers } from "ethers";

// const { GokiteAASDK } = pkg;

// export async function sendPayment(agent, { to, amount }) {
//   const { sdk, wallet } = agent;
//   const ownerAddress = await wallet.getAddress();
//   const valueWei = ethers.parseEther(amount.toString());

//   const txRequest = {
//     target: to,
//     value: valueWei.toString(),
//     callData: "0x"
//   };

//   const signFn = async (userOpHash) => {
//     return wallet.signMessage(ethers.getBytes(userOpHash));
//   };

//   const result = await sdk.sendUserOperationAndWait(
//     ownerAddress,
//     txRequest,
//     signFn
//   );

//   console.log("Transaction hash:", Result.userOpHash);
//   return result.userOpHash;
// }

import { GokiteAASDK } from "gokite-aa-sdk";
import { ethers } from "ethers";

export async function sendPayment(agent, { to, amount }) {
  const { sdk, wallet } = agent;
  const ownerAddress = await wallet.getAddress();
  
  // 1. 获取 AA 钱包地址
  const aaWalletAddress = sdk.getAccountAddress(ownerAddress);
  console.log(">>> AA Wallet:", aaWalletAddress);
  
  // 2. 检查钱包是否已部署（查链上代码）
  const provider = new ethers.JsonRpcProvider(process.env.KITE_RPC);
  const code = await provider.getCode(aaWalletAddress);
  
  if (code === "0x") {
    console.log(">>> 钱包未部署，先执行部署...");
    // 这里需要调用部署逻辑，如果 SDK 没有自动处理，可能需要手动 init
    // 或者先转一点钱进去触发部署（取决于 SDK 实现）
  }

  const valueWei = ethers.parseEther(amount.toString());

  const txRequest = {
    target: to,
    value: valueWei.toString(),
    callData: "0x"
  };

  const signFn = async (userOpHash) => {
    return wallet.signMessage(ethers.getBytes(userOpHash));
  };

  try {
    const result = await sdk.sendUserOperationAndWait(
      ownerAddress,
      txRequest,
      signFn
    );

    const txHash = result.status?.transactionHash || result.userOpHash;
    console.log("Transaction hash:", txHash);
    return txHash;
  } catch (err) {
    // 3. 如果是 reverted，可能是钱包问题，返回 Mock
    console.error(">>> 链上交易失败:", err.message);
    throw new Error(`AA 交易失败: ${err.message} (可能是钱包未部署或余额不足)`);
  }
}