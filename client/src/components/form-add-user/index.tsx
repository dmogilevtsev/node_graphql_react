import {useMutation} from '@apollo/client'
import React, {useState} from 'react'
import {Button, Card, Form} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {createUserAction} from '../../actions/user'
import {CREATE_USER} from '../../gql/mutations/users/createUser'
import {IToast, ToastBg} from '../../store/notificationsReducer'
import {notificationAction} from '../../actions/notification'

const FormAddUser = () => {
    const [newUser, {loading, error}] = useMutation(CREATE_USER)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const dispatch = useDispatch()

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const data = await newUser({
            variables: {
                input: {
                    email,
                    password: pass,
                },
            },
        })
        if (data && data.data.createUser) {
            dispatch(createUserAction(data.data.createUser))
        }
        setEmail('')
        setPass('')
    }


    if (!loading && error) {
        const toast: IToast = {
            id: new Date().toString(),
            title: 'Ошибка создания пользователя',
            body: error.message,
            bg: ToastBg.DANGER,
        }
        dispatch(notificationAction(toast))
    }

    return (
        <Card
            border="text-secondary"
            className="p-2 shadow my-2"
            style={{maxWidth: '20em'}}
        >
            <Form onSubmit={(e: any) => onSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter email"
                        className="form-control"
                        autoComplete="off"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="password.."
                        className="form-control"
                        autoComplete="off"
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={email.trim().length === 0 || pass.trim().length === 0}
                    onClick={(e: any) => onSubmit(e)}
                >
                    Add user
                </Button>
            </Form>
        </Card>
    )

}

export default FormAddUser
