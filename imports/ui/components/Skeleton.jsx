import React from 'react'
import PropTypes from 'prop-types'
import styled, {keyframes} from 'styled-components'

export const SkeletonTypes = {
  TEXT: 'text',
  GRID: 'grid',
  BLOCKS: 'blocks',
  PROFILE: 'profile',
}

export const Skeleton = ({type, loading, children}) => {
  return <MainContainer>{loading ? SkeletonComponents[type]() : children}</MainContainer>
}

Skeleton.propTypes = {
  type: PropTypes.oneOf(Object.values(SkeletonTypes)),
  loading: PropTypes.bool,
  children: PropTypes.node,
}

const MainContainer = styled.div`
  position: relative;
`

const SkeletonText = () => (
  <Text>
    <div>
      <div />
      <div />
      <div />
    </div>
    <div>
      <div />
      <div />
      <div />
    </div>
  </Text>
)

const SkeletonGrid = () => (
  <Grid>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </Grid>
)

const SkeletonComponents = {
  [SkeletonTypes.TEXT]: SkeletonText,
  [SkeletonTypes.GRID]: SkeletonGrid,
}

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  
  50% {
    opacity: .5;
  }
`

const Text = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  > div {
    margin-bottom: 20px;

    > div {
      width: 75%;
      height: 15px;
      margin-bottom: 5px;
      background-color: rgba(255, 255, 255, 0.03);

      &:first-child {
        width: 100%;
      }

      &:last-child {
        width: 100%;
        height: 75px;
      }
    }
  }
`

const Grid = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  row-gap: 10px;

  > div {
    height: 72px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.03);
  }
`
