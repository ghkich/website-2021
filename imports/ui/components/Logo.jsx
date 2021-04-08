import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {Colors} from '../theme'
import {Logomark} from './Logomark'

const LogoType = {
  G: 'g',
  CODE: 'code',
}

export const Logo = () => {
  const [logoType, setLogoType] = useState(LogoType.G)

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoType((prev) => (prev === LogoType.G ? LogoType.CODE : LogoType.G))
    }, 20000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <MainContainer>
      <Logomark type={logoType} />
      <NameContainer type={logoType}>
        <h1>Gustavo Kich</h1>
        <span>Full-stack Developer</span>
      </NameContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
`

const NameContainer = styled.div`
  transition: all 0.35s ease;

  > h1 {
    margin: 0;
    margin-bottom: 2px;
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
    if (props.type === LogoType.G) {
      return css`
        margin-left: 15px;

        > span {
          color: rgba(255, 255, 255, 0.3);
        }
      `
    }
    return css`
      margin-left: 25px;

      > span {
        color: ${Colors.LIGHTPINK};
      }
    `
  }}
`
