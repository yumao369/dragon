type MenuConfigItem = {
  path: string;
  component: string;
  redirect?: string;
}

export const menuConfig: MenuConfigItem[] = [
  // my dragonaire
  { path: "/my/", redirect: "/my/items", component: "" },
  { path: "/my/items", component: "ItemsPage" },
  { path: "/my/wallet", component: "MyWalletPage" },
  { path: "/my/item/:id", component: "ItemDetailPage" },
  { path: "/my/claim", component: "ClaimTokenPage" },
  { path: "/my/dao", component: "DAOPage" },
  { path: "/my/staking", component: "StakingPage" },
  { path: "/my/treasury", component: "TreasuryPage" },  //DAO金库
  { path: "/my/feedback", component: "FeedbackPage" },
  { path: "/my/setting", component: "AccountSettingPage" },

  // marketplace
  { path: "/marketplace", component: "Marketplace" },
  { path: "/marketplace/:id", component: "DragonDetailPage" },

  // mysterybox
  { path: "/mysterybox", component: "MysteryBoxPage" },
  { path: "/mysterybox/:cat", component: "MysteryBoxDetailPage" },

  // test
  { path: "/test", component: "TestPage" },
]

export const defaultPath = "/marketplace"

export const headerPathList = [/\/my\/.*?/, /\/marketplace.*?/, /\/mysterybox.*?/]
