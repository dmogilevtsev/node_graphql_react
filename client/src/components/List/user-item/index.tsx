import { useMutation } from '@apollo/client'
import React from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
import { TrashFill } from 'react-bootstrap-icons'
import { REMOVE_USER } from '../../../gql/queries/mutations/users/removeUser'

const UserItem = ({ user }: any): any => {
  const [_removeUser, { loading, error }] = useMutation(REMOVE_USER)
  const removeUser = async (id: number) => {
    const res = await _removeUser({
      variables: {
        id,
      },
    })
    console.log('remove', res)
  }
  if (error) {
    console.warn(error)
  }
  return (
    <Card className="my-1 mx-2 shadow p-1">
      <Card.Body className="pb-1">
        <Card.Title>
          {user.email}
          <Button
            variant="danger"
            onClick={() => removeUser(user.id)}
            type="button"
            disabled={loading}
          >
            <TrashFill />
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
