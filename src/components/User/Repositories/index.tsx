import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { client } from '../../../api/axios'
import { css } from '@emotion/css'

const styles = {
  wrapper: css`
    display: flex;
  `,
  input: css`
    display: flex;
    justify-content: center;
    margin: 0 auto;

    input {
      width: 100%;
    }
  `,
  repo: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  `,
}

type Repo = {
  archive_url: string | null
  archived: boolean | null
  assignees_url: string | null
  blobs_url: string | null
  branches_url: string | null
  clone_url: string | null
  collaborators_url: string | null
  comments_url: string | null
  commits_url: string | null
  compare_url: string | null
  contents_url: string | null
  contributors_url: string | null
  created_at: string | null
  default_branch: string | null
  deployments_url: string | null
  description: string | null
  disabled: boolean | null
  downloads_url: string | null
  events_url: string | null
  fork: boolean | null
  forks: number | null
  forks_count: number | null
  forks_url: string | null
  full_name: string | null
  git_commits_url: string | null
  git_refs_url: string | null
  git_tags_url: string | null
  git_url: string | null
  has_downloads: true
  has_issues: boolean | null
  has_pages: boolean | null
  has_projects: true
  has_wiki: true
  homepage: string | null
  hooks_url: string | null
  html_url: string | null | undefined
  id: number | null
  issue_comment_url: string | null
  issue_events_url: string | null
  issues_url: string | null
  keys_url: string | null
  labels_url: string | null
  language: string | null
  languages_url: string | null
  license: string | null
  merges_url: string | null
  milestones_url: string | null
  mirror_url: null
  name: string | null
  node_id: string | null
  notifications_url: string | null
  open_issues: number | null
  open_issues_count: number | null
  owner: any
  permissions: any
  private: boolean | null
  pulls_url: string | null
  pushed_at: string | null
  releases_url: string | null
  size: number | null
  ssh_url: string | null
  stargazers_count: number | null
  stargazers_url: string | null
  statuses_url: string | null
  subscribers_url: string | null
  subscription_url: string | null
  svn_url: string | null
  tags_url: string | null
  teams_url: string | null
  trees_url: string | null
  updated_at: string | null
  url: string | null
  watchers: number | null
  watchers_count: number | null
}

type Props = { repoUrl: string }

export const Repositories = React.memo(({ repoUrl }: Props) => {
  const [searchRepo, setSearchRepo] = useState('')
  const [repos, setRepos] = useState<Repo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getRepositories = useCallback(() => {
    setIsLoading(true)

    client
      .get<Repo[]>(repoUrl)
      .then((result) => {
        setRepos(result)
      })
      .finally(() => setIsLoading(false))
  }, [repoUrl])

  useEffect(() => {
    getRepositories()
  }, [getRepositories])

  const onChangeRepo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRepo(e.target.value)
  }, [])

  const showReposList = useMemo(() => {
    if (repos.length === 0) {
      return <h3>dont repo</h3>
    }

    const result = repos.filter((repo) => repo.name?.includes(searchRepo))

    if (result.length === 0) {
      return <h3>no results</h3>
    }

    return result.map((repo) => {
      const handleClick = () => repo.html_url && window.open(repo.html_url)

      return (
        <div className={styles.repo} key={repo.id} onClick={handleClick}>
          <p>{repo.name}</p>

          <div>
            <p>{repo.forks_count ?? 0} Forks</p>
            <p>{repo.stargazers_count ?? 0} Stars</p>
          </div>
        </div>
      )
    })
  }, [repos, searchRepo])

  return (
    <div>
      <div className={styles.input}>
        <input
          value={searchRepo}
          placeholder='search user repo'
          onChange={onChangeRepo}
        />
      </div>

      {isLoading && <h3>loading...</h3>}

      {showReposList}
    </div>
  )
})
