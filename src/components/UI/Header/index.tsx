import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearStore,
  getUsers,
  selectStoreSearch,
} from '../../../store/reducers/users'
import { AppDispatch } from '../../../store'
import { css } from '@emotion/css'

const styles = {
  header: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
      width: 290px;
    }

    h3 {
      margin: 0;
    }
  `,
}

export const Header = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>()
  const [search, setSearch] = useState('')

  const searchStore = useSelector(selectStoreSearch)

  useEffect(() => {
    setSearch(searchStore)
  }, [searchStore])

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)

      dispatch(clearStore())
      dispatch(getUsers({ query: e.target.value }))
    },
    [dispatch]
  )

  return (
    <header className={styles.header}>
      <h3>GitHub Search</h3>
      <input
        placeholder='search for user'
        value={search}
        onChange={onChangeSearch}
      />
    </header>
  )
})
