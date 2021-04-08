import PropTypes from 'prop-types'
import React from 'react'
import styled, {css} from 'styled-components'
import {Colors} from '../theme'

export const Logomark = ({type}) => {
  return (
    <MainContainer>
      <TopPiece type={type} />
      <LeftPiece type={type}>
        <div className="left-piece-a" />
        <div className="left-piece-b" />
      </LeftPiece>
      <RightPiece type={type}>
        <div className="right-piece-a" />
        <div className="right-piece-b" />
      </RightPiece>
    </MainContainer>
  )
}

Logomark.propTypes = {
  type: PropTypes.oneOf(['g', 'code']),
}

const PIECE = 10
const SPACE = 4
const SCALE = 1

const LogoSize = {
  PIECE: PIECE,
  SPACE: SPACE,
  WIDTH: 3 * PIECE + 2 * SPACE,
  BOTTOM: 2 * PIECE + SPACE,
  SCALE: SCALE,
}

const MainContainer = styled.div`
  position: relative;
  width: ${LogoSize.WIDTH}px;
  height: ${LogoSize.WIDTH}px;
`

const TopPiece = styled.div`
  width: ${LogoSize.WIDTH}px;
  height: ${LogoSize.PIECE}px;
  background-color: ${Colors.PINK};
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.35s ease;

  ${(props) => {
    if (props.type === 'code') {
      return css`
        width: ${LogoSize.WIDTH * 1.25}px;
        top: 14px;
        left: -3px;
        transform: rotate(-75deg) scale(${LogoSize.SCALE});
      `
    }
  }}
`

const LeftPiece = styled.div`
  height: ${LogoSize.BOTTOM}px;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.35s ease;

  ${(props) => {
    if (props.type === 'code') {
      return css`
        bottom: 11px;
        left: -3px;
        transform: rotate(45deg) scale(${LogoSize.SCALE});
      `
    }
  }}

  > .left-piece-a {
    width: ${LogoSize.BOTTOM}px;
    height: ${LogoSize.PIECE}px;
    background-color: ${Colors.LIGHTPINK};
    position: absolute;
    bottom: 0;
  }

  > .left-piece-b {
    width: ${LogoSize.PIECE}px;
    height: ${LogoSize.BOTTOM}px;
    background-color: ${Colors.LIGHTPINK};
    position: absolute;
    bottom: 0;
  }
`

const RightPiece = styled.div`
  height: ${LogoSize.BOTTOM}px;
  position: absolute;
  bottom: 0;
  right: 0;
  transition: all 0.35s ease;

  ${(props) => {
    if (props.type === 'code') {
      return css`
        bottom: 0px;
        right: -3px;
        transform: rotate(45deg) scale(${LogoSize.SCALE});
      `
    }
  }}

  > .right-piece-a {
    width: ${LogoSize.BOTTOM}px;
    height: ${LogoSize.PIECE}px;
    background-color: ${Colors.WHITEPINK};
    position: absolute;
    top: 0;
    right: 0;
  }

  > .right-piece-b {
    width: ${LogoSize.PIECE}px;
    height: ${LogoSize.BOTTOM}px;
    background-color: ${Colors.WHITEPINK};
    position: absolute;
    bottom: 0;
    right: 0;
  }
`
