import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {Colors, Spacing} from '../../theme'
import {Logo, LOGO_TRANSITION, LogoShape} from '../../components/Logo'
import PropTypes from 'prop-types'
import {PERSONAL_INFO_DATA} from '../../../infra/data/personal-info'

export const HeaderLogo = () => {
  return <HeaderLogoComponent name={PERSONAL_INFO_DATA.name} tagLine={PERSONAL_INFO_DATA.jobTitle} />
}

export const HeaderLogoComponent = ({name, tagLine}) => {
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
        <h1>{name}</h1>
        <span>{tagLine}</span>
      </NameContainer>
    </MainContainer>
  )
}

HeaderLogoComponent.propTypes = {
  name: PropTypes.string,
  tagLine: PropTypes.string,
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
    font-size: 14px;
    transition: color 0.35s ease;
    color: ${Colors.WHITEPINK};
  }

  > span {
    font-size: 13px;
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
