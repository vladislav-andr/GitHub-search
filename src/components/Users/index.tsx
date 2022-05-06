import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectErrorMessage,
  selectIsLoading,
  selectUsers,
} from '../../store/reducers/users'
import { User } from './User'
import { css } from '@emotion/css'

const styles = {
  content: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 25px;
  `,
}

export const Users = () => {
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectErrorMessage)
  const users = useSelector(selectUsers)

  return (
    <div className={styles.content}>
      {error && <h4>{error}</h4>}

      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}

      {isLoading && <h4>Loading...</h4>}
    </div>
  )
}
