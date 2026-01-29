# Kite AI 自动税务结算 Agent（Payment Track Demo）

## 一、项目背景与设计动机

随着区块链与 Web3 生态的发展，链上交易呈现出 **高频化、自动化、币种高度多样化** 的趋势。对于普通用户而言：

- 单个地址可能在一个征税周期内产生 **大量交易记录**；
- 涉及 **多种加密资产**，盈亏计算复杂；
- 各国税务制度不同，人工申报成本高、出错风险大；
- 一旦申报错误，可能面临合规与监管风险。

本项目尝试回答一个现实且前沿的问题：

> **是否可以让 AI Agent 自动完成“链上税务结算 + 支付”，从而实现用户无感的合规缴税？**

在本次 **Kite AI Payment Track 黑客松** 中，我们基于 Kite AI 提供的 **Agent Account、稳定币支付与权限控制能力**，构建了一个可运行的 Demo：

- 用户授权一个 Tax Agent
- Agent 自动分析（mock）链上交易收益
- 根据（mock）KYC / 税务身份计算应缴税额
- 在权限与额度控制下，**自动向税务机构地址完成链上支付**

该项目当前为 **概念验证（PoC）/ MVP 级别实现**，重点在于跑通完整流程，而非真实税法或真实税务系统对接。

---

## 二、核心能力与黑客松赛道对齐

本项目完整命中 Kite AI Payment Track 的核心要求：

- ✅ **Agent 身份系统**：使用 Kite Agent Account 执行支付
- ✅ **链上稳定币支付**：Agent 自动发起链上转账
- ✅ **权限 / 额度控制**：白名单税务地址 + 最大缴税额度限制
- ✅ **可复现 Demo**：提供完整后端服务与 API

一句话总结：

> **这是一个“以合规为目标场景”的 AI Agent 自动支付 Demo。**

---

## 三、系统整体架构

系统采用 **前后端分离的后端服务架构**，当前仅实现后端（API + Agent 逻辑）：

```
HTTP 请求
  ↓
API Controller
  ↓
TaxSettlementService（业务编排）
  ↓
┌───────────────┐
│ mock KYC      │
│ mock 交易记录 │
│ 税额计算      │
│ 权限校验      │
└───────────────┘
  ↓
Kite AI Agent Account
  ↓
链上稳定币支付（测试网）
```

---

## 四、项目目录结构说明

```
kite-payment/
├── src/
│   ├── app.js                 # 后端启动入口
│   ├── server.js              # Express Server 定义
│
│   ├── config/                # 全局配置
│   │   ├── kite.js             # Kite 网络 / RPC / Bundler 配置
│   │   └── tax.js              # mock 税率 / 税务机构地址 / 限额
│
│   ├── agent/                 # Kite Agent 相关逻辑
│   │   ├── agentFactory.js     # 创建 Tax Agent 的统一入口
│   │   ├── accountAA.js        # Kite Agent Account 初始化
│   │   ├── paymentAA.js        # 基于 Agent Account 的支付逻辑
│   │   └── permission.js       # 支付白名单与额度控制
│
│   ├── domain/                # 业务领域逻辑（全部为 mock）
│   │   ├── transaction/        # mock 链上交易记录
│   │   ├── kyc/                # mock 用户 KYC / 税务身份
│   │   └── tax/                # 税务计算与税务机构解析
│
│   ├── services/              # 核心业务编排层
│   │   └── taxSettlementService.js
│
│   ├── api/                   # HTTP API 层
│   │   ├── routes.js
│   │   └── tax.controller.js
│
│   └── utils/                 # 工具函数（预留）
│
├── .env                       # 私钥等敏感配置
├── package.json
└── README.md
```

---

## 五、核心模块功能说明

### 1. Agent 层（`src/agent`）

- **accountAA.js**
  - 使用 Kite AA SDK 创建 Agent Account
  - 返回 sdk / wallet / ownerAddress / accountAddress

- **paymentAA.js**
  - 基于 Kite Agent Account 发送 UserOperation
  - 完成链上稳定币或 ETH 转账

- **permission.js**
  - 支付前的风控校验
  - 包括：最大金额限制、税务机构地址白名单

---

### 2. Domain 层（`src/domain`）

> 当前全部为 mock 实现，用于模拟真实世界复杂依赖。

- **transactionRepo.js**：模拟链上交易盈亏
- **kycRepo.js**：模拟用户税务身份 / 居住地
- **taxCalculator.js**：根据收益与税率计算税额
- **taxResolver.js**：根据 KYC 决定税务机构与税率

---

### 3. Service 层（`taxSettlementService.js`）

这是整个项目的 **业务中枢**：

- 拉取用户 KYC
- 拉取交易记录
- 计算应缴税额
- 校验支付权限
- 调用 Agent 自动完成缴税支付

---

### 4. API 层

当前提供一个核心接口：

```
POST /api/tax/settle
```

请求示例：

```json
{
  "userAddress": "0xYourUserAddress"
}
```

返回示例：

```json
{
  "success": true,
  "taxAmount": 36,
  "authority": "0xMockTaxAuthorityAddress",
  "txHash": "0x..."
}
```

---

## 六、如何运行与测试（简述）

1. 配置 `.env`，填入测试网私钥：

```
PRIVATE_KEY=0x...
```

2. 安装依赖：

```
npm install
```

3. 启动后端服务：

```
node src/app.js
```

4. 调用 API（例如 curl / Postman）：

```
POST http://localhost:3000/api/tax/settle
```

---

## 七、当前状态与后续工作

### 当前已完成

- ✅ Agent Account 初始化
- ✅ 自动链上支付（测试网）
- ✅ mock 税务计算逻辑
- ✅ 权限与额度控制
- ✅ 完整端到端流程

### 后续可扩展方向

- 🔄 接入真实区块链 Indexer（替换 mock 交易）
- 🔄 前端 UI（用户授权、预览税额）
- 🔄 多税务身份 / 多税务机构自动拆分支付
- 🔄 稳定币支付与汇率换算
- 🔄 更复杂的合规与审计日志

---

## 八、免责声明

本项目仅为 **技术 Demo / 概念验证**，不构成任何法律、税务或合规建议。

