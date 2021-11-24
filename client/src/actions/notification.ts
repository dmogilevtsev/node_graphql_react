import {IToast, newToastReducer} from '../store/notificationsReducer'

export const notificationAction = (toast: IToast) => {
    return async (dispatch: any) => {
        dispatch(newToastReducer(toast))
    }
}