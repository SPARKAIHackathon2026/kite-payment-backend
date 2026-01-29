import pkg from "gokite-aa-sdk";
import { ethers } from "ethers";

const { GokiteAASDK } = pkg;

export async function sendPayment(agent, { to, amount }) {
  const { sdk, wallet, ownerAddress } = agent;

  // ⚠️ 单位：假设 amount 是 ETH / 稳定币的“整数单位”
  const value = ethers.parseEther(amount.toString()).toString();

  const txRequest = {
    targets: [to],
    values: [value],
    callDatas: ["0x"]
  };

  const signFn = async (userOpHash) => {
    return await wallet.signMessage(
      ethers.getBytes(userOpHash)
    );
  };

  const txResult = await sdk.sendUserOperationAndWait(
    ownerAddress,
    txRequest,
    signFn
  );

  return txResult.userOpHash;
}
