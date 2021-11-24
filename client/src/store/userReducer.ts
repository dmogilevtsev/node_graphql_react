export const CREATE_USER: string = 'CREATE_USER'
export const GET_ALL_USERS: string = 'GET_ALL_USERS'
export const REMOVE_USER: string = 'REMOVE_USER'

interface IAction {
    type: string
    payload: IUser | number
}

export interface IDefaultState<T> {
    users: T[]
}

export interface IUser {
    __typename: string
    id?: number
    password?: string
    createdAt?: string
}

const defaultState: IDefaultState<IUser> = {
    users: [],
}

// eslint-disable-next-line
export default (state: IDefaultState<IUser> = defaultState, action: IAction) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            }
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case REMOVE_USER:
            return {
                ...state,
                users: [...state.users.filter(u => u.id !== action.payload)],
            }
        default:
            return state
    }
}

export const getAllUsersReducer = (users: IUser[]) => ({
    type: GET_ALL_USERS,
    payload: users,
})
export const createNewUserReducer = (user: IUser) => ({
    type: CREATE_USER,
    payload: user,
})
export const removeUserReducer = (id: number) => ({
    type: REMOVE_USER,
    payload: id,
})