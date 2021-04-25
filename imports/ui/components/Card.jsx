import PropTypes from 'prop-types'
import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import styled, {css} from 'styled-components'
import {Breakpoints, Colors, Spacing} from '../theme'
import {Skeleton, SkeletonTypes} from './Skeleton'

// export const CardErrorBoundary = ({error, children, onFixButtonClick}) => {
//   if (error) {
//     return (
//       <div>
//         {error} <button onClick={() => onFixButtonClick()}>Fix</button>
//       </div>
//     )
//   } else {
//     return children
//   }
// }

// CardErrorBoundary.propTypes = {
//   error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
//   children: PropTypes.node.isRequired,
//   onFixButtonClick: PropTypes.func,
// }

export const Card = ({title, loading, skeletonType, active, onHeaderClick, children}) => {
  return (
    <CardContainer tabIndex={0} active={active}>
      <Header onClick={onHeaderClick}>
        <h1>{title}</h1>
      </Header>
      <HeaderShadow />
      <StyledSimpleBar>
        <Body>
          <Skeleton type={skeletonType} loading={loading}>
            {children}
          </Skeleton>
        </Body>
      </StyledSimpleBar>
    </CardContainer>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  skeletonType: PropTypes.oneOf(Object.values(SkeletonTypes)),
  active: PropTypes.bool,
  onHeaderClick: PropTypes.func.isRequired,
  children: PropTypes.node,
}

const CARD_HEIGHT = Spacing(17)
const CARD_HEADER_HEIGHT = Spacing(3)
const CARD_RADIUS = Spacing(0.3)
const CARD_PADDING = Spacing(1)

const CardContainer = styled.div`
  border-radius: ${CARD_RADIUS};
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03);
  position: relative;
  overflow: hidden;
  height: ${CARD_HEADER_HEIGHT};
  transition: height 0.3s linear;
  outline: none;

  ${(props) => {
    if (props.active) {
      return css`
        height: calc(${CARD_HEIGHT} + ${CARD_HEADER_HEIGHT});
      `
    }
  }}
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${CARD_HEADER_HEIGHT};
  padding: 0 ${CARD_PADDING};
  cursor: pointer;

  > h1 {
    margin: 0;
    color: rgba(255, 255, 255, 0.75);
    font-size: 13px;
    font-weight: lighter;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  > h3 {
    margin: 0;
    color: rgba(255, 255, 255, 0.3);
    font-size: 12px;
    font-weight: lighter;
  }

  ${Breakpoints.XS} {
    cursor: auto;
  }
`

const SHADOW_HEIGHT = Spacing(1)
const SHADOW_CLIP_HEIGHT = `calc(${SHADOW_HEIGHT} * 2.5)`

const HeaderShadow = styled.div`
  position: absolute;
  top: calc(${CARD_HEADER_HEIGHT} - ${SHADOW_HEIGHT});
  left: 0;
  right: 0;
  height: ${SHADOW_HEIGHT};

  :before {
    position: absolute;
    content: '';
    left: 2%;
    right: 2%;
    bottom: 0;
    top: 0;
    border-radius: 50% / ${SHADOW_HEIGHT};
    box-shadow: rgba(0, 0, 0, 0.1) 0 ${Spacing(0.25)} ${Spacing(0.5)};
    clip-path: polygon(
      0% ${SHADOW_HEIGHT},
      0% ${SHADOW_CLIP_HEIGHT},
      100% ${SHADOW_CLIP_HEIGHT},
      100% ${SHADOW_HEIGHT}
    );
  }
`

const StyledSimpleBar = styled(SimpleBar)`
  height: ${CARD_HEIGHT};
  margin-bottom: ${Spacing(0.25)};
  position: relative;
  z-index: 0;

  .simplebar-scrollbar {
    opacity: 0.25;

    &:before {
      background-color: ${Colors.BLACK};
    }
  }
`

const Body = styled.div`
  padding: ${CARD_PADDING};
`
