# 钱包系统 API 文档

## 认证相关

### 邀请注册
- **POST** `/api/wallet/auth/invite-register`
- **Body**: `{ username, email, password, inviteCode }`
- **Response**: `{ jwt, user }`

## 用户相关

### 获取用户资料
- **GET** `/api/users/profile`
- **Auth**: 需要认证
- **Response**: 用户信息（包含钱包、邀请关系、订单等）

### 获取邀请列表
- **GET** `/api/users/invitees`
- **Auth**: 需要认证
- **Response**: 邀请的用户列表

## 钱包相关

### 获取我的钱包
- **GET** `/api/wallet-balances/my`
- **Auth**: 需要认证
- **Response**: 钱包余额信息

## 订阅计划相关

### 获取可用计划
- **GET** `/api/subscription-plans/enabled`
- **Auth**: 无需认证
- **Response**: 启用的订阅计划列表

## 订阅订单相关

### 创建订单
- **POST** `/api/subscription-orders/create`
- **Auth**: 需要认证
- **Body**: `{ planId }`
- **Response**: 创建的订单信息

### 赎回订单
- **POST** `/api/subscription-orders/:id/redeem`
- **Auth**: 需要认证
- **Response**: 赎回后的订单信息

## 数据模型

### 用户扩展字段
- `diamondId`: 钻石ID（9位唯一标识）
- `referralCode`: 邀请码（9位唯一标识）
- `invitedBy`: 邀请人关系
- `invitees`: 被邀请人列表
- `wallet`: 钱包一对一关系
- `subscriptionOrders`: 订阅订单列表

### 订阅计划
- `name`: 计划名称（如 PLAN500）
- `priceUSDT`: 价格（USDT）
- `cycleDays`: 周期天数
- `staticYieldPct`: 静态收益率
- `aiTokenBonusPct`: AI代币奖励比例
- `maxPurchaseCnt`: 最大购买次数
- `unlockAfterCnt`: 解锁所需完成次数
- `referralPct`: 返佣比例
- `lotterySpinQuota`: 抽奖次数配额
- `enabled`: 是否启用

### 订阅订单
- `principalUSDT`: 本金
- `orderState`: 订单状态（active/finished）
- `startAt`: 开始时间
- `endAt`: 结束时间
- `staticYieldUSDT`: 静态收益
- `aiTokenQty`: AI代币数量
- `user`: 用户关系
- `plan`: 计划关系
- `referralReward`: 返佣记录

### 钱包余额
- `usdtBalance`: USDT余额
- `aiTokenBalance`: AI代币余额
- `user`: 用户一对一关系

### 邀请返佣
- `amountUSDT`: 返佣金额
- `referrer`: 推荐人
- `fromUser`: 来源用户
- `fromOrder`: 来源订单

## 业务流程

1. **用户注册**: 通过邀请码注册，自动生成钻石ID和邀请码
2. **购买计划**: 校验余额、解锁条件、购买次数限制
3. **订单到期**: 自动计算静态收益和返佣
4. **钱包管理**: 支持余额增减操作

## 安装和运行

```bash
# 安装依赖
npm install

# 开发模式
npm run develop

# 构建
npm run build

# 启动
npm start
```

## 数据库迁移

```bash
# 运行迁移
npm run strapi database:migrate

# 运行种子数据
npm run strapi database:seed
``` 