import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {GitHubMethodRequests} from '../../../../api/github'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card} from '../../../components/Card'
import {Colors, Typography} from '../../../theme'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookAlt} from '@fortawesome/pro-light-svg-icons'
import {shouldUpdateCollection} from '../../../../infra/shouldUpdateCollection'
import {SkeletonTypes} from '../../../components/Skeleton'

const SOURCE_DATA_URL = 'https://api.github.com/users/ghkich/repos?type=owner&sort=pushed'

export const GitHub = (props) => {
  const {data, loading} = useMethodRequest(GitHubMethodRequests.FETCH, {
    updateCollection: {
      validate: (data) => shouldUpdateCollection(data),
      sourceDataUrl: SOURCE_DATA_URL,
      updateRequestName: GitHubMethodRequests.UPDATE,
    },
  })

  return <GitHubComponent {...props} loading={loading} repos={data?.repos} />
}

export const GitHubComponent = ({loading, repos, ...props}) => {
  return (
    <Card {...props} loading={loading} skeletonType={SkeletonTypes.GRID}>
      <MainContainer>
        {repos?.map((repo) => (
          <GitHubItem key={repo.id}>
            <h2>
              <FontAwesomeIcon icon={faBookAlt} />
              <span>{repo.name}</span>
            </h2>
            <p>{repo.description || 'Add description on GitHub'}</p>
          </GitHubItem>
        ))}
      </MainContainer>
    </Card>
  )
}

GitHubComponent.propTypes = {
  loading: PropTypes.bool,
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
  height: 50px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);

  > h2 {
    margin: 0 0 7px;
    font-size: 12px;
    font-weight: lighter;
    color: ${Colors.WHITEPINK};

    > svg {
      color: ${Colors.LIGHTPINK};
    }

    > span {
      margin-left: 5px;
    }
  }

  > p {
    margin: 0;
    font-size: 12px;
    font-weight: lighter;
    line-height: ${Typography.LINE_HEIGHT_SNUG};
    color: rgba(255, 255, 255, 0.3);
  }
`
