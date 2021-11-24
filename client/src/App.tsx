import React, {useEffect} from 'react'
import {Alert, Container, Row, Spinner} from 'react-bootstrap'
import List from './components/List'
import FormAddUser from './components/form-add-user/index'
import {useDispatch} from 'react-redux'
import {getAllUsersAction} from './actions/user'
import {useLazyQuery, useSubscription} from '@apollo/client'
import {GET_ALL_USERS} from './gql/queries/users/getAllUsers'
import Notifications from './components/notifications/Notifications'
import {NEW_USER} from './gql/subscriptions/users/newUser'
import {notificationAction} from './actions/notification'
import {IToast} from './store/notificationsReducer'

function App() {
    const dispatch = useDispatch()
    const {data: subData, loading: subLoading} = useSubscription(NEW_USER)
    useEffect(() => {
        if (!subLoading && subData?.newUser) {
            const {email} = subData?.newUser
            const toast: IToast = {
                id: new Date().toString(),
                title: 'Новый пользователь',
                body: email,
            }
            dispatch(notificationAction(toast))
        }
    }, [subData])

    const [getData, {loading, data, error}] = useLazyQuery(GET_ALL_USERS)

    useEffect(() => {
        getData()
        if (data && data.getAllUsers) {
            dispatch(getAllUsersAction(data.getAllUsers))
        }
    }, [getData, dispatch, data])

    if (loading) {
        return <Spinner animation="grow"/>
    }

    if (error) {
        return <Alert variant="danger">{error.message}</Alert>
    }

    return (
        <>
            <Notifications/>
            <Container>
                <FormAddUser/>
                <Row>
                    <List/>
                </Row>
            </Container>
        </>
    )
}

export default App
