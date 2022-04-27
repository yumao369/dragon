import { SET_MY_MYSTERYBOX } from "Constants/ActionTypes"

const defaultState = {
  page: 1,
  pageSize: 8,
  total: 0,
  nfts: []
}

const reducer = (state = defaultState, action: Action) => {
  const { type, data } = action
  switch (type) {
    case SET_MY_MYSTERYBOX:
      return {
        ...state,
        nfts: data.nfts,
        page: data.page,
        total: data.total,
      }
    default:
      return state
  }
}

export default reducer
