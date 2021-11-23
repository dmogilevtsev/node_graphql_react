import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { IUser } from './userReducer'
import thunk from 'redux-thunk'
import userReducer from './userReducer'

export interface IStore {
  user: IState
}

export interface IState {
  users: IUser[]
}

const rootReducer = combineReducers({
  user: userReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
