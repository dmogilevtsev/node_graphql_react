import React from 'react'
import {ToastContainer} from 'react-bootstrap'
import Notification from './notification/Notification'
import {IToast} from '../../store/notificationsReducer'
import {useSelector} from 'react-redux'
import {IRootState} from '../../store'

const Notifications = () => {
    const toasts: IToast[] = useSelector((state: IRootState) => state.toast?.toasts) as IToast[]
    return (
        <div className="position-absolute w-100">
            <div
                aria-live="polite"
                aria-atomic="true"
                className="position-relative"
                style={{minHeight: '90vh'}}
            >
                <ToastContainer className="p-3" position="top-end">
                    {toasts.map((toast: IToast, i) => <Notification key={i} toast={toast}/>)}
                </ToastContainer>
            </div>
        </div>
    )
}

export default Notifications