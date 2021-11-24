import React from 'react'
import {useSelector} from 'react-redux'
import {Alert, Col, Row} from 'react-bootstrap'
import UserItem from './user-item'
import {IUser} from '../../store/userReducer'
import {IRootState} from '../../store'

const List = () => {
    const users: IUser[] = useSelector((state: IRootState) => state.user?.users) as IUser[]
    if (users.length === 0) {
        return <Row>
            <Alert variant="info">Нет пользователей</Alert>
        </Row>
    }
    return (
        <Row lg={4} md={3} sm={2} xs={1}>
            {users.map((user: IUser) => (
                <Col key={user.id}>
                    <UserItem key={user.id} user={user}/>
                </Col>
            ))}
        </Row>
    )
}

export default List
