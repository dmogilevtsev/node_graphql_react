import {useMutation} from '@apollo/client'
import React from 'react'
import {Button, Card, Spinner} from 'react-bootstrap'
import {TrashFill} from 'react-bootstrap-icons'
import {REMOVE_USER} from '../../../gql/mutations/users/removeUser'
import {useDispatch} from 'react-redux'
import {removeUserAction} from '../../../actions/user'
import {IToast, ToastBg} from '../../../store/notificationsReducer'
import {notificationAction} from '../../../actions/notification'

const UserItem = ({user}: any): any => {
    const dispatch = useDispatch()
    const [_removeUser, {loading, error}] = useMutation(REMOVE_USER)
    const removeUser = async (id: number) => {
        const res = await _removeUser({
            variables: {
                id,
            },
        })
        dispatch(removeUserAction(id))
        const toast: IToast = {
            id: new Date().toString(),
            title: 'Удаление',
            body: res.data.removeUser,
            bg: ToastBg.WARNING,
        }
        dispatch(notificationAction(toast))
    }
    if (error) {
        const toast: IToast = {
            id: new Date().toString(),
            title: 'Ошибка удаления',
            body: error.message,
            bg: ToastBg.DANGER,
        }
        dispatch(notificationAction(toast))
    }
    return (
        <Card className="my-1 mx-2 shadow p-1">
            <Card.Body className="pb-1">
                <Card.Title className="d-flex align-items-center">
                    {user.email}
                    <Button
                        variant="danger"
                        onClick={() => removeUser(user.id)}
                        type="button"
                        disabled={loading}
                        className="ms-auto"
                    >
                        <TrashFill/>
                        {loading ?? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span className="visually-hidden">Loading...</span>
                            </>
                        )}
                    </Button>
                </Card.Title>
                <Card.Footer>
                    <small className="text-muted">
                        Created: {user.createdAt.slice(0, 10)}
                    </small>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default UserItem
