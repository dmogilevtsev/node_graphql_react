import {createNewUserReducer, getAllUsersReducer, IUser, removeUserReducer} from '../store/userReducer'

export const getAllUsersAction = (users: IUser[]) => {
  return async (dispatch: any) => {
    dispatch(getAllUsersReducer(users))
  }
}

export const createUserAction = (user: IUser) => {
  return async (dispatch: any) => {
    dispatch(createNewUserReducer(user))
  }
}

export const removeUserAction = (id: number) => {
  return async (dispatch: any) => {
    dispatch(removeUserReducer(id))
  }
}