import React from 'react'
import PropTypes from 'prop-types'
import styled, {keyframes} from 'styled-components'
import {Spacing} from '../theme'

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
    <div />
  </Grid>
)

const SkeletonBlocks = () => (
  <Blocks>
    <div />
    <div />
    <div />
  </Blocks>
)

const SkeletonComponents = {
  [SkeletonTypes.TEXT]: SkeletonText,
  [SkeletonTypes.GRID]: SkeletonGrid,
  [SkeletonTypes.BLOCKS]: SkeletonBlocks,
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
    margin-bottom: ${Spacing(1.25)};

    > div {
      width: 75%;
      height: ${Spacing(0.85)};
      margin-bottom: ${Spacing(0.3)};
      background-color: rgba(255, 255, 255, 0.03);

      &:first-child {
        width: 100%;
      }

      &:last-child {
        width: 100%;
        height: ${Spacing(6)};
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
  column-gap: ${Spacing(0.625)};
  row-gap: ${Spacing(0.625)};

  > div {
    height: ${Spacing(4.5)};
    border-radius: ${Spacing(0.25)};
    background-color: rgba(255, 255, 255, 0.03);
  }
`

const Blocks = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${Spacing(0.75)};

  > div {
    height: ${Spacing(6)};
    border-radius: ${Spacing(0.25)};
    background-color: rgba(255, 255, 255, 0.03);
  }
`
