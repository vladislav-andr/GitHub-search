import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, selectUserById } from '../../store/reducers/users'
import { AppDispatch } from '../../store'
import { css } from '@emotion/css'
import { Repositories } from './Repositories'

const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
    padding: 20px;
    flex-direction: column;
  `,
  bio: css`
    display: flex;
    justify-content: center;
  `,
  content: css`
    display: flex;
  `,
  img: css`
    width: 100px;

    img {
      width: 100%;
      max-height: 100px;
    }
  `,
  info: css`
    p {
      margin: 0 0 0 10px;
    }
  `,
}

export const User = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { userId } = useParams<{ userId: string }>()

  const user = useSelector(selectUserById(Number(userId)))

  useEffect(() => {
    if (!user && userId) {
      dispatch(getUser(Number(userId)))
    }
  }, [dispatch, user, userId])

  if (!user) {
    return <div>Loading...</div>
  }

  const {
    avatar_url,
    name,
    email,
    location,
    created_at,
    followers,
    following,
    bio,
    repos_url,
  } = user

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.img}>
          <img src={avatar_url ?? ''} alt='' />
        </div>

        <div className={styles.info}>
          <p>Username: {name ?? ''}</p>
          <p>Email: {email ?? ''}</p>
          <p>Location: {location ?? ''}</p>
          <p>Join Date: {created_at ?? ''}</p>
          <p>Followers: {followers ?? ''}</p>
          <p>Following: {following ?? ''}</p>
        </div>
      </div>
      <div className={styles.bio}>
        <p>{bio}</p>
      </div>

      <Repositories repoUrl={repos_url} />
    </div>
  )
}
