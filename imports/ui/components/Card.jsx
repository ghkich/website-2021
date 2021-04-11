import PropTypes from 'prop-types'
import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import styled, {keyframes} from 'styled-components'
import {Colors, Spacings} from '../theme'

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

export const Card = ({title, rightSpot, children}) => {
  return (
    <CardContainer>
      <Header>
        <h1>{title}</h1>
        <h3>{rightSpot}</h3>
      </Header>
      <HeaderShadow />
      <StyledSimpleBar>
        <Body>{children}</Body>
      </StyledSimpleBar>
    </CardContainer>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  rightSpot: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  children: PropTypes.node.isRequired,
}

const CARD_HEIGHT = 280
const HEADER_HEIGHT = 48

const CardStyle = {
  RADIUS: Spacings.byFactor(3),
  PADDING: Spacings.byFactor(10),
  HEADER_HEIGHT: HEADER_HEIGHT,
  HEIGHT: CARD_HEIGHT,
}

const CardContainer = styled.div`
  border-radius: ${CardStyle.RADIUS}px;
  background-color: rgba(0, 0, 0, 0.25);
  //backdrop-filter: blur(4px);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03);
  position: relative;
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${CardStyle.HEADER_HEIGHT}px;
  padding: 0 ${CardStyle.PADDING}px;
  //backdrop-filter: blur(4px);

  //background-color: rgba(255, 255, 255, 0.0025);
  //border-bottom: 1px solid rgba(255, 255, 255, 0.01);
  //box-shadow: 4px 0 10px 0 rgba(0, 0, 0, 0.25);

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
`

const SHADOW_HEIGHT = 20

const HeaderShadowStyle = {
  HEIGHT: SHADOW_HEIGHT,
  CLIP_HEIGHT: SHADOW_HEIGHT * 2.5,
  POS_FROM_TOP: HEADER_HEIGHT - SHADOW_HEIGHT,
}

const HeaderShadow = styled.div`
  position: absolute;
  top: ${HeaderShadowStyle.POS_FROM_TOP}px;
  left: 0;
  right: 0;
  height: ${HeaderShadowStyle.HEIGHT}px;

  :before {
    position: absolute;
    content: '';
    left: 2%;
    right: 2%;
    bottom: 0;
    top: 0;
    border-radius: 50% / ${HeaderShadowStyle.HEIGHT}px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 5px 10px;
    clip-path: polygon(
      0% ${HeaderShadowStyle.HEIGHT}px,
      0% ${HeaderShadowStyle.CLIP_HEIGHT}px,
      100% ${HeaderShadowStyle.CLIP_HEIGHT}px,
      100% ${HeaderShadowStyle.HEIGHT}px
    );
  }
`

const StyledSimpleBar = styled(SimpleBar)`
  height: ${CardStyle.HEIGHT}px;
  margin-bottom: 3px;
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
  padding: ${CardStyle.PADDING}px;
`
