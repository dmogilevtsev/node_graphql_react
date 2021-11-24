import React, {useEffect, useState} from 'react'
import {Toast} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {removeToastReducer, ToastBg} from '../../../store/notificationsReducer'

const Notification = ({toast}: any) => {
    const dispatch = useDispatch()
    const [isShow, setIsShow] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsShow(false)
            dispatch(removeToastReducer(toast))
        }, 3000)
    }, [])
    return (
        <div className="my-1 pe-2" style={{zIndex: 999}}>
            <Toast bg={toast.bg} className="ms-auto" delay={3000} show={isShow}>
                <Toast.Header>
                    <strong className="me-auto">{toast.title}</strong>
                </Toast.Header>
                <Toast.Body className={toast.bg === ToastBg.DARK ? 'text-white' : ''}>{toast.body}</Toast.Body>
            </Toast>
        </div>
    )
}

export default Notification