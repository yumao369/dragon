import { MY_ITEMS_LOAD } from "Constants/ActionTypes";

const defaultState = {
  activateWallet:false,
}

const reducer = (state = defaultState, action: Action) => {
  const { type, data } = action
  switch (type) {
    case MY_ITEMS_LOAD:
      console.log("MY_ITEMS_LOAD")
      console.log("data",data)
      return {
        ...state,
        activateWallet:data,
      }
    default:
      return state
  }
}

export default reducer