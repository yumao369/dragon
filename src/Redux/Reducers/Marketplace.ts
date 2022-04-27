import { SET_MARKETPLACE_NFTS } from "Constants/ActionTypes"

const defaultState = {
  nfts: [],
  page: 1,
  pageSize: 8,
  total: 0,
}

const reducer = (state = defaultState, action: Action) => {
  const { type, data } = action
  switch (type) {
    case SET_MARKETPLACE_NFTS:
      return {
        ...state,
        total: data.total,
        nfts: data.nfts
      }
    default:
      return state
  }
}

export default reducer
