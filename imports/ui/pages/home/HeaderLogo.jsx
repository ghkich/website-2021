import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {Colors, Spacing} from '../../theme'
import {Logo, LOGO_TRANSITION, LogoShape} from '../../components/Logo'

export const HeaderLogo = () => {
  const [logoShape, setLogoShape] = useState(LogoShape.NORMAL)

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoShape((prev) => (prev === LogoShape.NORMAL ? LogoShape.CODE : LogoShape.NORMAL))
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <MainContainer>
      <Logo shape={logoShape} />
      <NameContainer logoShape={logoShape}>
        <h1>Gustavo Kich</h1>
        <span>Full-stack Developer</span>
      </NameContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  flex: none;
  display: flex;
  align-items: center;
`

const NameContainer = styled.div`
  transition: ${LOGO_TRANSITION};

  > h1 {
    margin: 0 0 2px;
    font-weight: normal;
    font-size: 15px;
    transition: color 0.35s ease;
    color: ${Colors.WHITEPINK};
  }

  > span {
    font-size: 14px;
    transition: color 0.35s ease;
  }

  ${(props) => {
    if (props.logoShape === LogoShape.NORMAL) {
      return css`
        margin-left: ${Spacing(1)};

        > span {
          color: rgba(255, 255, 255, 0.3);
        }
      `
    }
    return css`
      margin-left: ${Spacing(1.625)};

      > span {
        color: ${Colors.LIGHTPINK};
      }
    `
  }}
`
