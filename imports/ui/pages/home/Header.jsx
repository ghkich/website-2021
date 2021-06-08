import React from 'react'
import styled, {css} from 'styled-components'
import {Breakpoints, Colors, Spacing} from '../../theme'
import {Logo, LOGO_TRANSITION, LogoShape} from '../../components/Logo'
import PropTypes from 'prop-types'
import {PERSONAL_INFO_DATA} from '../../../infra/data/personal-info'
import {Contact, ContactDataType} from '../../components/Contact'
import {useAppContext, useAppSelectors} from '../../app/AppContext'

export const Header = () => {
  const {name, jobTitle, email, phone, networks} = PERSONAL_INFO_DATA
  const {contentReady, appReady} = useAppSelectors()
  const {actions} = useAppContext()
  return (
    <HeaderComponent
      name={name}
      tagLine={jobTitle}
      contactData={{email, phone, networks}}
      contentReady={contentReady}
      appReady={appReady}
      onTransitionEnd={() => actions.setAppReady()}
    />
  )
}

export const HeaderComponent = ({name, tagLine, contactData, contentReady, appReady, onTransitionEnd}) => {
  return (
    <MainContainer>
      <AnimateHeaderDiv contentReady={contentReady} onTransitionEnd={onTransitionEnd} />
      <HeaderLogo>
        <Logo shape={contentReady ? LogoShape.NORMAL : LogoShape.CODE} />
        <NameContainer opacity={appReady ? 1 : 0}>
          <h1>{name}</h1>
          <span>{tagLine}</span>
        </NameContainer>
      </HeaderLogo>
      <AnimateHeaderDiv contentReady={contentReady} />
      <ContactContainer opacity={appReady ? 1 : 0}>
        <Contact data={contactData} />
      </ContactContainer>
    </MainContainer>
  )
}

HeaderComponent.propTypes = {
  name: PropTypes.string,
  tagLine: PropTypes.string,
  contactData: PropTypes.shape(ContactDataType),
  contentReady: PropTypes.bool.isRequired,
  appReady: PropTypes.bool.isRequired,
  onTransitionEnd: PropTypes.func.isRequired,
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${Spacing(6)};
  margin: 0 ${Spacing(0.625)};
  position: relative;
`

const HeaderLogo = styled.div`
  flex: none;
  display: flex;
  position: relative;
`

const AnimateHeaderDiv = styled.div`
  transition: flex 1s;

  ${({contentReady}) => {
    if (!contentReady) {
      return css`
        flex: auto;
      `
    }
    return css`
      flex: 0;
    `
  }};
`

const NameContainer = styled.div`
  width: ${Spacing(8)};
  margin-top: ${Spacing(0.175)};
  transition: opacity 0.3s;
  opacity: ${({opacity}) => opacity};
  position: absolute;
  left: ${Spacing(3.25)};

  ${Breakpoints.TABLET_S} {
    display: none;
  }

  > h1 {
    margin: 0 0 2px;
    font-size: 14px;
    font-weight: 400;
    transition: ${LOGO_TRANSITION};
    color: ${Colors.WHITE_PRIMARY};
  }

  > span {
    font-size: 13px;
    font-weight: 200;
    color: ${Colors.TEXT};
    transition: ${LOGO_TRANSITION};
  }
`

const ContactContainer = styled.div`
  transition: opacity 0.3s;
  opacity: ${({opacity}) => opacity};
  position: absolute;
  right: 0;
`
