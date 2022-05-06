import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { getAllUsers, getUserApi, SearchUsers, UserInfo } from '../../api/users'
import type { RootState } from '../index'

export const getUsers = createAsyncThunk(
  'users/getSearchUsers',
  async (
    payload: { query: string; page?: number },
    { signal, rejectWithValue }
  ) => {
    try {
      if (!payload) {
        return {
          items: [] as SearchUsers['items'],
          total_count: 0,
          search: '',
          incomplete_results: 0,
          currentPage: 1,
        }
      }

      const source = axios.CancelToken.source()

      signal.addEventListener('abort', () => {
        source.cancel()
      })

      const response = await getAllUsers(
        { query: payload.query, page: payload.page ?? 1 },
        {
          cancelToken: source.token,
        }
      )

      return {
        ...response,
        search: payload.query,
        currentPage: payload.page ?? 1,
      }
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const getUser = createAsyncThunk(
  'users/getUser',
  async (payload: number, { rejectWithValue }) => {
    try {
      const response = await getUserApi(payload)

      return response
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const loadMoreUsers = createAsyncThunk(
  'users/loadMoreUsers',
  async (_, { dispatch, getState }) => {
    const { users } = getState() as RootState

    await dispatch(
      getUsers({ query: users.search, page: users.currentPage + 1 })
    )
  }
)

type UsersState = {
  list: SearchUsers['items']
  isLoading: boolean
  total_count: number
  currentPage: number
  error: string
  search: string
}

const entityAdapter = createEntityAdapter<UserInfo>({
  selectId: (state) => state.id,
})

const initialState = entityAdapter.getInitialState<UsersState>({
  list: [],
  isLoading: false,
  total_count: 0,
  currentPage: 1,
  error: '',
  search: '',
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.search = action.payload.search
        state.isLoading = false
        state.list = [...state.list, ...action.payload.items]
        state.total_count = action.payload.total_count
        state.currentPage = action.payload.currentPage
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.total_count = 0
        state.list = []
        state.currentPage = 1
        state.error = action.payload as string
        state.search = ''
      })
      .addCase(getUser.fulfilled, (state, action) => {
        entityAdapter.upsertOne(state, action.payload)
      })
  },
})

const selectRootUsers = (state: RootState) => state.users

export const { selectById } = entityAdapter.getSelectors(selectRootUsers)

export const selectUserById = (userId: number) =>
  createSelector(
    (state: RootState) => state,
    (state) => selectById(state, userId)
  )

export const selectIsLoading = createSelector(
  selectRootUsers,
  (state) => state.isLoading
)

export const selectErrorMessage = createSelector(
  selectRootUsers,
  (state) => state.error
)

export const selectStoreSearch = createSelector(
  selectRootUsers,
  (state) => state.search
)

export const selectUsers = createSelector(
  selectRootUsers,
  (state) => state.list
)

export const selectIsShowNextPage = createSelector(
  selectRootUsers,
  ({ total_count, currentPage }) => total_count - 50 * currentPage > 0
)

export const { clearStore } = usersSlice.actions

export default usersSlice.reducer
