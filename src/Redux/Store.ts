import { createStore, applyMiddleware } from "redux"
import Reducers from "./Reducers"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, Reducers)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)