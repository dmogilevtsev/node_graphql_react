import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import UserItem from './user-item'
import { IUser } from '../../store/userReducer'
import { IStore } from '../../store/index'

const List = () => {
  const users: IUser[] = useSelector((state: IStore) => state.user?.users)

  return (
    <Row lg={4} md={3} sm={2} xs={1}>
      {users.map((user: IUser) => (
        <Col key={user.id}>
          <UserItem key={user.id} user={user} />
        </Col>
      ))}
    </Row>
  )
}

export default List
