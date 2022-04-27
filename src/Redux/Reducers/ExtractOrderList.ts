import { SET_EXTRACT_ORDER_LIST } from "Constants/ActionTypes"

const defaultState = {
  extractOrderList: [],
  page: 1,
  pageSize: 10,
  total: 0,
}

const reducer = (state = defaultState, action: Action) => {
  const { type, data } = action
  switch (type) {
    case SET_EXTRACT_ORDER_LIST:
      console.log("SET_EXTRACT_ORDER_LIST")
      console.log(data)
      return {
        ...state,
        extractOrderList: data.extractOrderList,
        page: data.page,
        total: data.total,
      }
    default:
      return state
  }
}

export default reducer
