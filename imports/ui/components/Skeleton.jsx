import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styled, {css, keyframes} from 'styled-components'
import {Breakpoints, Spacing} from '../theme'

export const SkeletonTypes = {
  TEXT: 'text',
  GRID: 'grid',
  BLOCKS: 'blocks',
  PROFILE: 'profile',
}

export const Skeleton = ({type, loading, children}) => {
  const [unmounted, setUnmounted] = useState(false)

  useEffect(() => {
    if (loading) {
      setUnmounted(false)
    }
  }, [loading])

  return (
    <>
      {!unmounted && (
        <AnimatedContainer loading={loading} onTransitionEnd={() => !loading && setUnmounted(true)}>
          <SkeletonComponent type={type} />
        </AnimatedContainer>
      )}
      {!loading && children}
    </>
  )
}

Skeleton.propTypes = {
  type: PropTypes.oneOf(Object.values(SkeletonTypes)),
  loading: PropTypes.bool,
  children: PropTypes.node,
}

const AnimatedContainer = styled.div`
  padding: ${Spacing(1.25)};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  ${({loading}) => {
    if (loading) {
      return css`
        opacity: 1;
      `
    }
    return css`
      opacity: 0;
      transition: opacity 0.2s linear;
    `
  }}
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

const SkeletonComponent = ({type}) => {
  if (type === SkeletonTypes.TEXT) return <SkeletonText />
  if (type === SkeletonTypes.GRID) return <SkeletonGrid />
  if (type === SkeletonTypes.BLOCKS) return <SkeletonBlocks />
  throw new Error(`No component found for ${type}`)
}

SkeletonComponent.propTypes = {
  type: PropTypes.oneOf(Object.values(SkeletonTypes)),
}

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  
  50% {
    opacity: .5;
  }
`

const pulseAnimation = css`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

const Text = styled.div`
  ${pulseAnimation};

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
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${Spacing(0.625)};
  row-gap: ${Spacing(0.625)};
  ${pulseAnimation};

  > div {
    height: ${Spacing(4.5)};
    border-radius: ${Spacing(0.25)};
    background-color: rgba(255, 255, 255, 0.03);
  }

  ${Breakpoints.DESKTOP_S} {
    grid-template-columns: 1fr;

    > div {
      height: ${Spacing(3.625)};
    }
  }

  ${Breakpoints.TABLET_L} {
    grid-template-columns: 1fr 1fr;

    > div {
      height: ${Spacing(4.5)};
    }
  }

  ${Breakpoints.TABLET_S} {
    grid-template-columns: 1fr;

    > div {
      height: ${Spacing(3.625)};
    }
  }

  ${Breakpoints.MOBILE_L} {
    grid-template-columns: 1fr 1fr;
  }

  ${Breakpoints.MOBILE_M} {
    > div {
      height: ${Spacing(4.5)};
    }
  }

  ${Breakpoints.MOBILE_S} {
    grid-template-columns: 1fr;

    > div {
      height: ${Spacing(3.625)};
    }
  }
`

const Blocks = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${Spacing(0.625)};
  ${pulseAnimation};

  > div {
    height: ${Spacing(5)};
    border-radius: ${Spacing(0.25)};
    background-color: rgba(255, 255, 255, 0.03);
  }
`
