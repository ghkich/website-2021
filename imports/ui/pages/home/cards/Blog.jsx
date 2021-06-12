import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {BlogMethodRequests} from '../../../../api/blog'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card, CardIcons} from '../../../components/Card'
import {shouldUpdateCollection} from '../../../../infra/shouldUpdateCollection'
import {Colors, Spacing, Transitions, Typography} from '../../../theme'
import {SkeletonTypes} from '../../../components/Skeleton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMemoPad} from '@fortawesome/pro-light-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
library.add(faMemoPad)

const API_KEY = 'f34ieehw4u4zcysmvyyeqqghfjkt9yx8alo2mzfd'
const TIMESTAMP = new Date().getTime() // to ignore rss2json cache
const SOURCE_DATA_URL = `https://gustavokich.medium.com/feed?t=${TIMESTAMP}`
const URL_RSS_TO_JSON = `https://api.rss2json.com/v1/api.json?rss_url=${SOURCE_DATA_URL}&api_key=${API_KEY}`

export const Blog = (props) => {
  const {data = [], loading} = useMethodRequest(BlogMethodRequests.FETCH, {
    updateCollection: {
      validate: (data) => shouldUpdateCollection(data),
      sourceDataUrl: URL_RSS_TO_JSON,
      updateRequestName: BlogMethodRequests.UPDATE,
    },
  })

  return <BlogComponent {...props} loading={loading} posts={data} />
}

export const BlogComponent = ({loading, posts, ...props}) => {
  return (
    <Card {...props} icon={CardIcons.BLOG} loading={loading} skeletonType={SkeletonTypes.TRIPLE_ROW}>
      <MainContainer>
        {posts?.map((post) => (
          <PostContainer key={post.guid} target="_blank" rel="noreferrer" href={post.link}>
            <h2>
              <FontAwesomeIcon icon={faMemoPad} />
              <span>{post.title}</span>
            </h2>
            <div dangerouslySetInnerHTML={{__html: post.description}} />
          </PostContainer>
        ))}
      </MainContainer>
    </Card>
  )
}

BlogComponent.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      guid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string),
      link: PropTypes.string.isRequired,
    }),
  ),
}

const MainContainer = styled.div`
  position: relative;
`

const PostContainer = styled.a`
  display: block;
  margin-bottom: ${Spacing(0.625)};
  padding: ${Spacing(0.625)};
  border-radius: ${Spacing(0.25)};
  border: ${Spacing(0.0625)} solid rgba(255, 255, 255, 0.03);
  background-color: rgba(255, 255, 255, 0.01);
  transition: ${Transitions.COLORS};
  cursor: pointer;
  text-decoration: none;

  > h2 {
    margin: 0 0 ${Spacing(0.375)};
    color: ${Colors.LIGHT_SECONDARY};
    font-weight: 200;
    font-size: 13px;
    line-height: ${Typography.LINE_HEIGHT_NORMAL};
    transition: ${Transitions.COLORS};

    > svg {
      color: ${Colors.SECONDARY};
    }

    > span {
      margin-left: ${Spacing(0.3125)};
    }
  }

  > div {
    font-weight: 200;
    font-size: 13px;
    line-height: ${Typography.LINE_HEIGHT_SNUG};
    color: ${Colors.TEXT};

    p {
      margin: 0;
    }
  }

  :hover {
    border-color: rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.03);

    > h2 {
      color: ${Colors.WHITE_SECONDARY};
    }
  }
`
