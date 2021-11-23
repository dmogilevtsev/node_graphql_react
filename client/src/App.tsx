import React, { useEffect } from 'react'
import { Container, Alert, Row, Spinner } from 'react-bootstrap'
import List from './components/List'
import FormAddUser from './components/form-add-user/index'
import { useDispatch } from 'react-redux'
import { getAllUsersAction } from './actions/user'
import { useLazyQuery } from '@apollo/client'
import { GET_ALL_USERS } from './gql/queries/users/getAllUsers'

function App() {
  const dispatch = useDispatch()

  const [getData, { loading, data, error }] = useLazyQuery(GET_ALL_USERS)

  useEffect(() => {
    getData()
    if (data && data.getAllUsers) {
      dispatch(getAllUsersAction(data.getAllUsers))
    }
  }, [getData, dispatch, data])

  if (loading) {
    return <Spinner animation="grow" />
  }

  if (error) {
    return <Alert variant="danger">{error.message}</Alert>
  }

  return (
    <Container>
      <FormAddUser />
      <Row>
        <List />
      </Row>
    </Container>
  )
}

export default App
