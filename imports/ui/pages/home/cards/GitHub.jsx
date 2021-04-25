import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {GitHubMethodRequests} from '../../../../api/github'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card} from '../../../components/Card'
import {Colors, Spacing, Typography} from '../../../theme'
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
  column-gap: ${Spacing(0.625)};
  row-gap: ${Spacing(0.625)};
`

const GitHubItem = styled.div`
  box-sizing: border-box;
  height: ${Spacing(4.5)};
  padding: ${Spacing(0.625)};
  border-radius: ${Spacing(0.25)};
  border: 1px solid rgba(255, 255, 255, 0.03);
  background-color: rgba(255, 255, 255, 0.01);

  > h2 {
    margin: 0 0 ${Spacing(0.4375)};
    font-size: 12px;
    font-weight: lighter;
    color: ${Colors.WHITEPINK};

    > svg {
      color: ${Colors.LIGHTPINK};
    }

    > span {
      margin-left: ${Spacing(0.3125)};
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
