import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {GitHubMethodRequests} from '../../api/github'
import {useMethodRequest} from '../../infra/useMethodRequest'
import {Card} from '../components/Card'
import {Colors, Typography} from '../theme'

export const GitHub = ({title}) => {
  const updateRequest = useMethodRequest(GitHubMethodRequests.UPDATE, {manual: true})

  const {data} = useMethodRequest(GitHubMethodRequests.FETCH, {
    onSuccess: ({_id, updatedAt} = {updatedAt: new Date()}) => {
      const delayTime = 1 * 60 * 1000 // x hours * 60 min * 1000 milliseconds
      const today = new Date().getTime()
      const lastUpdate = new Date(updatedAt).getTime()

      if (today > lastUpdate + delayTime) {
        // update collection if one day passed since last update
        fetch('https://api.github.com/users/ghkich/repos?type=owner&sort=pushed')
          .then((resp) => resp.json())
          .then((data) => updateRequest.run({id: _id, data}))
      }
    },
  })

  return <GitHubComponent title={title} repos={data?.repos} />
}

GitHub.propTypes = {
  title: PropTypes.string.isRequired,
}

export const GitHubComponent = ({title, repos}) => {
  return (
    <Card title={title}>
      <MainContainer>
        {repos?.map((repo) => (
          <GitHubItem key={repo.id}>
            <h2>{repo.name}</h2>
            <p>{repo.description || 'Add description on GitHub'}</p>
          </GitHubItem>
        ))}
      </MainContainer>
    </Card>
  )
}

GitHubComponent.propTypes = {
  title: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ),
}

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  row-gap: 10px;
`

const GitHubItem = styled.div`
  padding: 10px;
  height: 55px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);

  > h2 {
    margin: 0;
    margin-bottom: 7px;
    font-size: 12px;
    font-weight: lighter;
    color: ${Colors.LIGHTPINK};
  }

  > p {
    margin: 0;
    font-size: 12px;
    font-weight: lighter;
    line-height: ${Typography.LINE_HEIGHT_SNUG};
    color: rgba(255, 255, 255, 0.4);
  }
`
