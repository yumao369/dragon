import { ifContainThenRemove, ifSameThenDefault } from "Common/functions"
import {
  MARKETPLATE_LOAD,
  SET_ELEMENT,
  APPLY_FILTER,
  SET_CLASSTYPE,
  SET_PARITY,
  SET_FARMPOWER,
  SET_STARRANGE,
  SET_LEVELRANGE,
  SET_BREEDRANGE,
  SET_DERANGE,
  SET_PRICERANGE,
  SET_SEARCHID,
  CLEAR_ALL,
  SET_SORTTYPE,
  PREV_PAGE,
  SET_PAGE
} from "Constants/ActionTypes"

const defaultState = {
  pageIndex: 1,
  pageSize: 8,
  element: '',
  classType: '',
  parity: [],
  farmPower: [],
  starRange: [3, 15],
  levelRange: [1, 260],
  breedRange: [0, 3],
  deRange: [0, 20480],
  priceRange: ['', ''],
  searchId: '',
  sortType: "Latest Sale", // "latest sale", "oldest sale", "lowest sale", "highest sale",
}

const reducer = (state = defaultState, action: Action) => {
  const { type, data } = action
  switch (type) {
    case CLEAR_ALL:
      return {
        ...defaultState,
        sortType: state.sortType,
      }
    case MARKETPLATE_LOAD:
      return state
    case APPLY_FILTER:
      return state
    case SET_ELEMENT:
      return {
        ...state,
        element: ifSameThenDefault(data.element, state.element, defaultState.element)
      }
    case SET_CLASSTYPE:
      return {
        ...state,
        classType: ifSameThenDefault(data.classType, state.classType, defaultState.classType)
      }
    case SET_PARITY:
      return {
        ...state,
        parity: ifContainThenRemove(data.parity, state.parity)
      }
    case SET_FARMPOWER:
      return {
        ...state,
        farmPower: ifContainThenRemove(data.farmPower, state.farmPower)
      }
    case SET_STARRANGE:
      return {
        ...state,
        starRange: ifSameThenDefault(data.starRange, state.starRange, defaultState.starRange)
      }
    case SET_LEVELRANGE:
      return {
        ...state,
        levelRange: data.levelRange
      }
    case SET_BREEDRANGE:
      return {
        ...state,
        breedRange: data.breedRange
      }
    case SET_DERANGE:
      return {
        ...state,
        deRange: data.deRange
      }
    case SET_PRICERANGE:
      return {
        ...state,
        priceRange: data.priceRange
      }
    case SET_SEARCHID:
      return {
        ...defaultState,
        searchId: data.searchId
      }
    case SET_SORTTYPE:
      return {
        ...state,
        sortType: data.sortType
      }
    case SET_PAGE:
      return {
        ...state,
        pageIndex: data.page
      }

    default: return state
  }
}

export default reducer