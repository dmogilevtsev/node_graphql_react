const NEW_NOTIFICATION: string = 'NEW_NOTIFICATION'
const REMOVE_TOAST: string = 'REMOVE_TOAST'

export enum ToastBg {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info',
    LIGHT = 'light',
    DARK = 'dark',
}

export interface IToast {
    id: string
    title: string
    body?: string
    bg?: ToastBg
}

interface IAction<T> {
    type: string
    payload: T
}

interface IDefaultState<T> {
    toasts: T[]
}

const defaultState: IDefaultState<IToast> = {
    toasts: [],
}


// eslint-disable-next-line
export default (state: IDefaultState<IToast> = defaultState, action: IAction<IToast>) => {
    switch (action.type) {
        case NEW_NOTIFICATION:
            return {
                ...state,
                toasts: [...state.toasts, action.payload],
            }
        case REMOVE_TOAST:
            return {
                ...state,
                toasts: [...state.toasts.filter(t => t.id !== action.payload.id)],
            }
        default:
            return state
    }
}

export const newToastReducer = (toast: IToast) => ({
    type: NEW_NOTIFICATION,
    payload: toast,
})
export const removeToastReducer = (toast: IToast) => ({
    type: REMOVE_TOAST,
    payload: toast,
})
