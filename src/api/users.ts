import { client, Config } from './axios'

export type GetUsersType = {
  query: string
  page: number
}

export type SearchUsers = {
  incomplete_results: boolean
  items: {
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
  }[]
  total_count: number
}

export function getAllUsers(
  { query, page }: GetUsersType,
  config?: Config
): Promise<SearchUsers> {
  return client.get(`/search/users`, {
    params: { q: query, page, per_page: 50 },
    ...config,
  })
}

export type UserInfo = {
  avatar_url: string | null
  bio: string | null
  blog: string
  company: string | null
  created_at: string | null
  email: string | null
  events_url: string
  followers: number
  followers_url: string
  following: number
  following_url: string
  gists_url: string
  gravatar_id: string
  hireable: string | null
  html_url: string
  id: number
  location: string | null
  login: string
  name: string | null
  node_id: string
  organizations_url: string
  public_gists: number
  public_repos: number
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  twitter_username: string | null
  type: string
  updated_at: string
  url: string
}

export function getUserApi(query: number, config?: Config): Promise<UserInfo> {
  return client.get(`/user/${query}`, config)
}
