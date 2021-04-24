import PropTypes from 'prop-types'
import React from 'react'
import styled, {css} from 'styled-components'
import {Colors, Spacing} from '../theme'

export const LogoShape = {
  NORMAL: 'normal',
  CODE: 'code',
}

export const Logo = ({shape}) => {
  return (
    <MainContainer>
      <TopPiece shape={shape} />
      <LeftPiece shape={shape}>
        <div className="left-piece-a" />
        <div className="left-piece-b" />
      </LeftPiece>
      <RightPiece shape={shape}>
        <div className="right-piece-a" />
        <div className="right-piece-b" />
      </RightPiece>
    </MainContainer>
  )
}

Logo.propTypes = {
  shape: PropTypes.oneOf(Object.values(LogoShape)),
}

const SPACE_BETWEEN_PIECES = Spacing(0.25)
const TOP_PIECE_HEIGHT = Spacing(0.625)
const LOGO_WIDTH = `calc(3 * ${TOP_PIECE_HEIGHT} + 2 * ${SPACE_BETWEEN_PIECES})`
const BOTTOM_PIECE_WIDTH = `calc(2 * ${TOP_PIECE_HEIGHT} + ${SPACE_BETWEEN_PIECES})`

export const LOGO_TRANSITION = 'all 0.2s linear'
const SCALE_ON_TRANSITION = 0.9
const RADIUS_ON_TRANSITION = Spacing(0.125)

const MainContainer = styled.div`
  position: relative;
  width: ${LOGO_WIDTH};
  height: ${LOGO_WIDTH};
`

const TopPiece = styled.div`
  width: ${LOGO_WIDTH};
  height: ${TOP_PIECE_HEIGHT};
  background-color: ${Colors.PINK};
  position: absolute;
  top: 0;
  left: 0;
  transition: ${LOGO_TRANSITION};

  ${(props) => {
    if (props.shape === LogoShape.CODE) {
      return css`
        width: calc(${LOGO_WIDTH} * 1.25);
        border-radius: ${RADIUS_ON_TRANSITION};
        top: ${Spacing(0.9375)};
        left: -${Spacing(0.3125)};
        transform: rotate(-75deg) scale(${SCALE_ON_TRANSITION});
      `
    }
  }}
`

const LeftPiece = styled.div`
  height: ${BOTTOM_PIECE_WIDTH};
  position: absolute;
  bottom: 0;
  left: 0;
  transition: ${LOGO_TRANSITION};

  > .left-piece-a {
    width: ${BOTTOM_PIECE_WIDTH};
    height: ${TOP_PIECE_HEIGHT};
    background-color: ${Colors.LIGHTPINK};
    position: absolute;
    bottom: 0;
  }

  > .left-piece-b {
    width: ${TOP_PIECE_HEIGHT};
    height: ${BOTTOM_PIECE_WIDTH};
    background-color: ${Colors.LIGHTPINK};
    position: absolute;
    bottom: 0;
  }

  ${(props) => {
    if (props.shape === LogoShape.CODE) {
      return css`
        bottom: ${Spacing(0.875)};
        left: -${Spacing(0.4375)};
        transform: rotate(45deg) scale(${SCALE_ON_TRANSITION});

        > div {
          border-radius: ${RADIUS_ON_TRANSITION};
        }
      `
    }
  }}
`

const RightPiece = styled.div`
  height: ${BOTTOM_PIECE_WIDTH};
  position: absolute;
  bottom: 0;
  right: 0;
  transition: ${LOGO_TRANSITION};

  > .right-piece-a {
    width: ${BOTTOM_PIECE_WIDTH};
    height: ${TOP_PIECE_HEIGHT};
    background-color: ${Colors.WHITEPINK};
    position: absolute;
    top: 0;
    right: 0;
  }

  > .right-piece-b {
    width: ${TOP_PIECE_HEIGHT};
    height: ${BOTTOM_PIECE_WIDTH};
    background-color: ${Colors.WHITEPINK};
    position: absolute;
    bottom: 0;
    right: 0;
  }

  ${(props) => {
    if (props.shape === LogoShape.CODE) {
      return css`
        bottom: -${Spacing(0.0625)};
        right: -${Spacing(0.375)};
        transform: rotate(45deg) scale(${SCALE_ON_TRANSITION});

        > div {
          border-radius: ${RADIUS_ON_TRANSITION};
        }
      `
    }
  }}
`
