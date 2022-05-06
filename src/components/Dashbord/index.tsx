import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadMoreUsers,
  selectIsLoading,
  selectIsShowNextPage,
} from '../../store/reducers/users'
import { AppDispatch } from '../../store'
import { Users } from '../Users'
import { Header } from '../UI/Header'
import { css } from '@emotion/css'

const styles = {
  wrapper: css`
    max-height: 100vh;
    overflow-y: scroll;
  `,
}

export const Dashbord = () => {
  const dispatch = useDispatch<AppDispatch>()

  const isLoading = useSelector(selectIsLoading)
  const isShowNextPage = useSelector(selectIsShowNextPage)

  const scrollHandler = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget

      if (
        isShowNextPage &&
        !isLoading &&
        scrollHeight - clientHeight > 0 &&
        scrollHeight - scrollTop - clientHeight < 250
      ) {
        dispatch(loadMoreUsers())
      }
    },
    [dispatch, isLoading, isShowNextPage]
  )

  return (
    <div className={styles.wrapper} onScroll={scrollHandler}>
      <Header />

      <Users />
    </div>
  )
}
