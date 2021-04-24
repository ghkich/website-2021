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

const PIECE = Spacing(0.625)
const SPACE = Spacing(0.25)

const LogoSize = {
  PIECE: PIECE,
  SPACE: SPACE,
  WIDTH: `calc(3 * ${PIECE} + 2 * ${SPACE})`,
  BOTTOM: `calc(2 * ${PIECE} + ${SPACE})`,
  SCALE: 1,
}

const MainContainer = styled.div`
  position: relative;
  width: ${LogoSize.WIDTH};
  height: ${LogoSize.WIDTH};
`

const TopPiece = styled.div`
  width: ${LogoSize.WIDTH};
  height: ${LogoSize.PIECE};
  background-color: ${Colors.PINK};
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.35s ease;

  ${(props) => {
    if (props.shape === LogoShape.CODE) {
      return css`
        width: calc(${LogoSize.WIDTH} * 1.25);
        top: 14px;
        left: -3px;
        transform: rotate(-75deg) scale(${LogoSize.SCALE});
      `
    }
  }}
`

const LeftPiece = styled.div`
  height: ${LogoSize.BOTTOM};
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.35s ease;

  ${(props) => {
    if (props.shape === LogoShape.CODE) {
      return css`
        bottom: 11px;
        left: -3px;
        transform: rotate(45deg) scale(${LogoSize.SCALE});
      `
    }
  }}

  > .left-piece-a {
    width: ${LogoSize.BOTTOM};
    height: ${LogoSize.PIECE};
    background-color: ${Colors.LIGHTPINK};
    position: absolute;
    bottom: 0;
  }

  > .left-piece-b {
    width: ${LogoSize.PIECE};
    height: ${LogoSize.BOTTOM};
    background-color: ${Colors.LIGHTPINK};
    position: absolute;
    bottom: 0;
  }
`

const RightPiece = styled.div`
  height: ${LogoSize.BOTTOM};
  position: absolute;
  bottom: 0;
  right: 0;
  transition: all 0.35s ease;

  ${(props) => {
    if (props.shape === LogoShape.CODE) {
      return css`
        bottom: 0;
        right: -3px;
        transform: rotate(45deg) scale(${LogoSize.SCALE});
      `
    }
  }}

  > .right-piece-a {
    width: ${LogoSize.BOTTOM};
    height: ${LogoSize.PIECE};
    background-color: ${Colors.WHITEPINK};
    position: absolute;
    top: 0;
    right: 0;
  }

  > .right-piece-b {
    width: ${LogoSize.PIECE};
    height: ${LogoSize.BOTTOM};
    background-color: ${Colors.WHITEPINK};
    position: absolute;
    bottom: 0;
    right: 0;
  }
`
