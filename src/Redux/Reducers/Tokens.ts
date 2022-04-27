import * as types from 'Constants/ActionTypes'

const defaultState = {
  bnbPrice: 0,
  bnb: 0,
  dear: 0,
  des: 0,
  mDear: 0,
  mDes: 0
}

const reducer = (state = defaultState, action: Action) => {
  const { type, data } = action 
  switch (type) {
    case types.SET_BNB:
      return {
        ...state,
        bnb: data
      }
    case types.SET_DEAR:
      return {
        ...state,
        dear: data
      }
    case types.SET_DES:
      return {
        ...state,
        des: data
      }
    case types.SET_MDEAR:
      return {
        ...state,
        mDear: data 
      }
    case types.SET_MDES:
      return {
        ...state,
        mDes: data
      }
    default: 
      return state 
  }
}

export default reducer

