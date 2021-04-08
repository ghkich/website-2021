import PropTypes from 'prop-types'
import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import styled from 'styled-components'
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

export const Card = ({title, children}) => {
  return (
    <CardContainer>
      <Header>
        <h1>{title}</h1>
      </Header>
      <Body>{children}</Body>
      <Footer></Footer>
    </CardContainer>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const CardStyle = {
  RADIUS: Spacings.byFactor(4),
  PADDING: Spacings.byFactor(12),
  HEIGHT: 280,
}

const CardContainer = styled.div`
  border-radius: ${CardStyle.RADIUS}px;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.02);
  position: relative;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 ${CardStyle.PADDING}px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);

  > h1 {
    margin: 0;
    color: rgba(255, 255, 255, 0.75);
    font-size: 14px;
    font-weight: lighter;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
`

const Body = styled(SimpleBar)`
  height: ${CardStyle.HEIGHT}px;
  margin-bottom: 3px;
  padding: ${CardStyle.PADDING}px;
  z-index: 0;
  position: relative;

  .simplebar-scrollbar {
    opacity: 0.15;

    &:before {
      background-color: ${Colors.LIGHTBLUE};
    }
  }
`

const Footer = styled.div`
  height: ${CardStyle.PADDING}px;
  border-bottom-right-radius: ${CardStyle.RADIUS}px;
  border-bottom-left-radius: ${CardStyle.RADIUS}px;
  position: absolute;
  z-index: 1;
  right: 10px;
  bottom: 1px;
  left: 1px;
`
