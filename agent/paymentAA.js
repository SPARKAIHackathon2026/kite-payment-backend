// payment.js
import pkg from "gokite-aa-sdk"; // ✅ 默认导入
import "dotenv/config";

const { GokiteAASDK } = pkg; // 取需要的类
// 其他类型声明不用导入，因为 JS 运行时不需要类型

export async function sendPayment({ sdk, wallet, accountAddress }) {
  const txRequest = {
    to: "0x103034dbd47AfaeF830Df2F9147a05149992377d",
    value: "100000000000000" // 0.0001 ETH
  };

  // 使用 SDK 发送交易
  const userOp = await sdk.createUserOperation(
    accountAddress,
    txRequest
  );

  const txResult = await sdk.sendUserOperationAndWait(
    accountAddress,
    txRequest,
    wallet.signTransaction.bind(wallet)
  );

  console.log("Transaction hash:", txResult.userOpHash);
}
