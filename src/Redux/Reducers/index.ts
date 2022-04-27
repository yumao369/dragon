import { combineReducers } from "redux";

import MarketplaceFilter from "./MarketplaceFilter"
import Authentication from "./Authentication"
import Marketplace from "./Marketplace"
import MyNfts from "./MyNfts"
import MyBoxes from "./MyBoxes"
import Tokens from "./Tokens"
import MyItemsLoad from "./MyItemsLoad"
import ExtractOrderList from "./ExtractOrderList"
import {
    TokenStakeOptionStore,
    TokenStakeListStore,
} from "./TokenStake"

export default combineReducers({

    // market的过滤条件
    MarketplaceFilter,
    Authentication,
    Marketplace,
    MyNfts,
    Tokens,
    MyBoxes,
    MyItemsLoad,
    ExtractOrderList,
    
    TokenStakeOptionStore,
    TokenStakeListStore,
});