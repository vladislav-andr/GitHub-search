import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { generatePath, useNavigate } from 'react-router-dom'
import { Routes } from '../../../utils/routes'
import { getUser, selectUserById } from '../../../store/reducers/users'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'

const styles = {
  card: css`
    width: 100%;
    border-radius: 10px;
    border: 1px solid black;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
  `,
  wrapper: css`
    display: flex;
    align-items: center;
  `,
  img: css`
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      max-height: 40px;
    }
  `,
  text: css`
    margin-left: 10px;

    p {
      margin: 0;
    }
  `,
}

type Props = {
  user: {
    avatar_url: string
    events_url: string
    followers_url: string
    following_url: string
    gists_url: string
    gravatar_id: string
    html_url: string
    id: number
    login: string
    node_id: string
    organizations_url: string
    received_events_url: string
    repos_url: string
    score: number
    site_admin: boolean
    starred_url: string
    subscriptions_url: string
    type: string
    url: string
  }
}

export const User = React.memo(({ user }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const selectUser = useSelector(selectUserById(user.id))

  const [isLoading, setIsLoading] = useState(false)

  const getUserInfo = useCallback(async () => {
    setIsLoading(true)

    await dispatch(getUser(user.id))

    setIsLoading(false)
  }, [dispatch, user.id])

  useEffect(() => {
    if (!selectUser) {
      getUserInfo()
    }
  }, [getUserInfo, selectUser])

  const handleClickProfile = useCallback(
    () => navigate(generatePath(Routes.USER, { userId: String(user.id) })),
    [navigate, user.id]
  )

  if (isLoading) {
    return (
      <div className={styles.card}>
        <span>Loading...</span>
      </div>
    )
  }

  if (!selectUser) {
    return null
  }

  return (
    <div className={styles.card} onClick={handleClickProfile}>
      <div className={styles.wrapper}>
        <div className={styles.img}>
          <img src={selectUser.avatar_url ?? ''} alt='' />
        </div>

        <div className={styles.text}>
          <p>{selectUser.name}</p>
        </div>
      </div>

      <div>Repo: {selectUser.public_repos}</div>
    </div>
  )
})
