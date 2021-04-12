import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {BlogMethodRequests} from '../../../../api/blog'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card} from '../../../components/Card'
import {shouldUpdateCollection} from '../../../../infra/shouldUpdateCollection'

export const Blog = ({title}) => {
  const {data} = useMethodRequest(BlogMethodRequests.FETCH, {
    updateCollection: {
      validate: (data) => shouldUpdateCollection(data),
      sourceUrl: 'https://api.rss2json.com/v1/api.json?rss_url=https://gustavokich.medium.com/feed/',
      updateRequestName: BlogMethodRequests.UPDATE,
    },
  })

  return <BlogComponent title={title} posts={data?.posts} />
}

Blog.propTypes = {
  title: PropTypes.string.isRequired,
}

export const BlogComponent = ({title, posts}) => {
  return (
    <Card title={title} rightSpot="">
      <MainContainer>
        {posts?.map((post) => (
          <div key={post.guid}>{post.title}</div>
        ))}
      </MainContainer>
    </Card>
  )
}

BlogComponent.propTypes = {
  title: PropTypes.string.isRequired,
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
