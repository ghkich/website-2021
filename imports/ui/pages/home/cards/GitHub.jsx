import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {GitHubMethodRequests} from '../../../../api/github'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card, CardIcons} from '../../../components/Card'
import {Colors, Spacing, Transitions, Typography} from '../../../theme'
import {shouldUpdateCollection} from '../../../../infra/shouldUpdateCollection'
import {SkeletonTypes} from '../../../components/Skeleton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookAlt} from '@fortawesome/pro-light-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
library.add(faBookAlt)

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
    <Card {...props} icon={CardIcons.REPO} loading={loading} skeletonType={SkeletonTypes.GRID}>
      <MainContainer>
        {repos?.map((repo) => (
          <GitHubItem key={repo.id} target="_blank" rel="noreferrer" href={repo.htmlUrl}>
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
      htmlUrl: PropTypes.string.isRequired,
    }),
  ),
}

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${Spacing(0.625)};
  row-gap: ${Spacing(0.625)};
`

const GitHubItem = styled.a`
  box-sizing: border-box;
  height: ${Spacing(4.5)};
  padding: ${Spacing(0.625)};
  border-radius: ${Spacing(0.25)};
  border: ${Spacing(0.0625)} solid rgba(255, 255, 255, 0.03);
  background-color: rgba(255, 255, 255, 0.01);
  transition: ${Transitions.COLORS};
  cursor: pointer;
  text-decoration: none;

  > h2 {
    margin: 0 0 ${Spacing(0.4375)};
    font-size: 12px;
    font-weight: 200;
    color: ${Colors.LIGHT_SECONDARY};
    transition: ${Transitions.COLORS};

    > svg {
      color: ${Colors.SECONDARY};
    }

    > span {
      margin-left: ${Spacing(0.3125)};
    }
  }

  > p {
    margin: 0;
    font-size: 12px;
    font-weight: 200;
    line-height: ${Typography.LINE_HEIGHT_SNUG};
    color: ${Colors.TEXT};
  }

  :hover {
    border-color: rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.03);

    > h2 {
      color: ${Colors.WHITE_SECONDARY};
    }
  }
`
