import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {BlogMethodRequests} from '../../../../api/blog'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card} from '../../../components/Card'
import {shouldUpdateCollection} from '../../../../infra/shouldUpdateCollection'
import {Colors, Typography} from '../../../theme'
import {SkeletonTypes} from '../../../components/Skeleton'

const API_KEY = 'f34ieehw4u4zcysmvyyeqqghfjkt9yx8alo2mzfd'
const TIMESTAMP = new Date().getTime() // to ignore rss2json cache
const SOURCE_DATA_URL = `https://gustavokich.medium.com/feed?t=${TIMESTAMP}`
const URL_RSS_TO_JSON = `https://api.rss2json.com/v1/api.json?rss_url=${SOURCE_DATA_URL}&api_key=${API_KEY}`

export const Blog = (props) => {
  const {data, loading} = useMethodRequest(BlogMethodRequests.FETCH, {
    updateCollection: {
      validate: (data) => shouldUpdateCollection(data),
      sourceDataUrl: URL_RSS_TO_JSON,
      updateRequestName: BlogMethodRequests.UPDATE,
    },
  })

  return <BlogComponent {...props} loading={loading} posts={data?.posts} />
}

export const BlogComponent = ({loading, posts, ...props}) => {
  return (
    <Card {...props} loading={loading} skeletonType={SkeletonTypes.TEXT}>
      <MainContainer>
        {posts?.map((post) => (
          <PostContainer key={post.guid}>
            <h2>{post.title}</h2>
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

const PostContainer = styled.div`
  margin-bottom: 12px;
  color: ${Colors.LIGHTPINK};
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);

  > h2 {
    margin: 0 0 10px;
    color: ${Colors.LIGHTPINK};
    font-weight: lighter;
    font-size: 13px;
  }

  > div {
    color: rgba(255, 255, 255, 0.3);
    font-weight: lighter;
    font-size: 13px;
    line-height: ${Typography.LINE_HEIGHT_SNUG};

    p {
      margin: 0;
    }
  }
`
