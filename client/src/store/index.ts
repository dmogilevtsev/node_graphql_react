import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './userReducer'
import thunk from 'redux-thunk'
import notificationsReducer from './notificationsReducer'

export interface IDefaultState {
  users?: []
  toasts?: []
}

export interface IRootState {
  user?: IDefaultState
  toast?: IDefaultState
}

const rootReducer = combineReducers({
  user: userReducer,
  toast: notificationsReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
