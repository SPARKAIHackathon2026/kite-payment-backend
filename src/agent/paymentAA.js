import pkg from "gokite-aa-sdk";
import { ethers } from "ethers";

const { GokiteAASDK } = pkg;

export async function sendPayment(agent, { to, amount }) {
  const { sdk, wallet } = agent;
  const ownerAddress = await wallet.getAddress();
  const valueWei = ethers.parseEther(amount.toString());

  const txRequest = {
    target: to,
    value: valueWei.toString(),
    callData: "0x"
  };

  const signFn = async (userOpHash) => {
    return wallet.signMessage(ethers.getBytes(userOpHash));
  };

  const result = await sdk.sendUserOperationAndWait(
    ownerAddress,
    txRequest,
    signFn
  );

  console.log("Transaction hash:", Result.userOpHash);
  return result.userOpHash;
}

