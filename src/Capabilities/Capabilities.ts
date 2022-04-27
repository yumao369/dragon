export type LoginResp = {
  qrtoken: string;  // qrcode
  token: string;    // jwt token
  address: string;  // my address
}

export type UpdateCapabilityResp = Array<{
  tokenId: string;
  code: number;
  msg: string;
  data: {
    r: string;
    v: string;
    s: string;
    calldata: string;
    orderid: string;
  }
}>

export type GetGameCurrencyResp = {
  mDear: number;
  mDes: number;
}

export type ExtractResp = {
  r: string;
  v: string;
  s: string;
  calldata: string;
  orderid: number;
}

export type UnlockResp = {
  r: string;
  v: string;
  s: string;
  calldata: string;
  orderid: number;
}

export type ExtractRewardsResp = {
  r: string;
  v: string;
  s: string;
  calldata: string;
  orderid: number;
}

export type RechargeResp = {
  txhash: string;
  amount: Amount;
  moneyType: "mDear" | "mDes"
}



type Grade = "SS" | "S" | "A" | "B" | "C" | "D";

export type MyOwnNFT = {
  add_skill_damage: number
  armor: number
  attack: number
  avatarUrl: string
  baseUrl: string
  camp: number
  career: number
  cfg_id: number
  character: string
  computing: number
  energy: number
  grade: Grade
  has_not_comfirm_attr: number
  hatch: number
  hp: number
  imageUrl: string
  level: number
  nftdata: { dna: string, artifacts: string }
  orderid: number
  power: number
  quality: number
  speed: number
  star_level: number
  status: number
  tokenid: number
}

export type MyOwnNFTWithLockStatus = {
  add_skill_damage: number
  armor: number
  attack: number
  avatarUrl: string
  baseUrl: string
  camp: number
  career: number
  cfg_id: number
  character: string
  computing: number
  energy: number
  grade: Grade
  has_not_comfirm_attr: number
  hatch: number
  hp: number
  imageUrl: string
  level: number
  nftdata: { dna: string, artifacts: string }
  orderid: number
  power: number
  quality: number
  speed: number
  star_level: number
  status: number
  tokenid: number
  lockStatus: number
  unlockTime: number
}

export type GetMyOwnNftsResp = {
  shelvesdata: MyOwnNFT[];
  count: number;
}


export type MarketNFT = {
  add_skill_damage: number
  armor: number
  attack: number
  avatarUrl: string
  baseUrl: string
  buyer: string
  camp: number
  career: number
  cfg_id: number
  character: string
  computing: number
  createtime: string
  energy: number
  grade: Grade
  has_not_comfirm_attr: number
  hatch: number
  hp: number
  imageUrl: string
  level: number
  nftdata: { dna: string, artifacts: string }
  orderid: number
  paymenttype: string
  power: number
  price: string
  quality: number
  seller: string
  speed: number
  star_level: number
  tokenid: number
}

export type MarketNftsResp = {
  shelvesdata: MarketNFT[];
  count: number;
}


export type MysteryBox = {
  tokenid: number;
  nftdata: {
    dna: string;
    artifacts: string;
  };
  status: 1 | 2 | 3; // 1 自身所得  2://市场售卖 3://质押(游戏中可玩)
}

export type GetBoxesResp = {
  shelvesdata: MysteryBox[];
  count: number;
}

export type UpdateQRTokenResp = string

export type GetClaimOrderResp = Array<{
  orderid: string,
  money_type: "mDear" | "mDes",
  amount: Amount,
  status: 1 | 2 | 3 | 4 | 5 // 0：初始化 // 1成功 2 失败游戏通知失败 3生成签名失败 4:失败, 5创建完毕
}>

export type GameUser = {
  exist: boolean;
}

export type getExtractOrderResp = {
  rechargeOrder: ExtractOrder[];
  count: number;
}

export type getNearlyDaoResp = {
  time: string;
  amount: string;
}

export type ExtractOrder = {
  _id: string,
  address: string,
  amount: Amount,
  create_time: string,
  txamount: string,
  money_type: "mDear" | "mDes",
  orderid: string,
  tx_hash: string,
  status: 1 | 2 | 3 | 4 | 5,
  game_status: number
}



