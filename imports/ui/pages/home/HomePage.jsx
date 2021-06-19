import React, {useEffect, useState} from 'react'
import styled, {css, keyframes} from 'styled-components'
import {WorkExperiences} from './cards/WorkExperiences'
import {GitHub} from './cards/GitHub'
import {Header} from './Header'
import {ShortBio} from './cards/ShortBio'
import PropTypes from 'prop-types'
import {WorldMap} from './cards/WorldMap'
import {Blog} from './cards/Blog'
import {Breakpoints, Colors, Spacing, Transitions, Typography} from '../../theme'
import {MAX_WIDTH_MOBILE_L} from '../../theme/config/breakpoints'
import {Skills} from './cards/Skills'
import {faHeart, faMugHot} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {useAppSelectors} from '../../app/AppContext'
library.add(faHeart, faMugHot, faGithub)

const CardNames = {
  WORK_EXPERIENCES: 'work-experiences',
  SHORT_BIO: 'short-bio',
  GITHUB: 'github',
  SKILLS: 'skills',
  WORLD_MAP: 'world-map',
  BLOG: 'blog',
}

const cards = [
  {
    id: CardNames.WORK_EXPERIENCES,
    title: 'Work Experiences',
    component: WorkExperiences,
  },
  {
    id: CardNames.SHORT_BIO,
    title: 'Short Bio',
    component: ShortBio,
  },
  {
    id: CardNames.GITHUB,
    title: 'GitHub',
    component: GitHub,
  },
  {
    id: CardNames.SKILLS,
    title: 'Skills',
    component: Skills,
  },
  {
    id: CardNames.WORLD_MAP,
    title: 'World Map',
    component: WorldMap,
  },
  {
    id: CardNames.BLOG,
    title: 'Blog',
    component: Blog,
  },
]

export const HomePage = () => {
  const {appReady} = useAppSelectors()
  return <HomePageComponent cards={cards} appReady={appReady} />
}

export const HomePageComponent = ({cards, appReady}) => {
  const [activeCardId, setActiveCardId] = useState()
  const [isSmallScreen, setIsSmallScreen] = useState()
  const [sourceCodeHover, setSourceCodeHover] = useState(false)

  useEffect(() => {
    setIsSmallScreen(window.matchMedia(MAX_WIDTH_MOBILE_L).matches)
  }, [])

  // wait matchMedia().matches before rendering
  if (isSmallScreen === undefined) return null

  return (
    <BoxedLayout>
      <Header />
      <CardsGrid>
        {cards?.map(({id, title, component: Component}) => (
          <Component
            key={id}
            title={title}
            active={isSmallScreen ? activeCardId === id : true}
            onHeaderClick={() => isSmallScreen && setActiveCardId((prev) => (prev !== id ? id : undefined))}
            appReady={appReady}
          />
        ))}
      </CardsGrid>
      <Footer appReady={appReady}>
        <div>
          <MadeWith $sourceCodeHover={sourceCodeHover}>
            Made with <FontAwesomeIcon icon={faHeart} /> and <FontAwesomeIcon icon={faMugHot} />{' '}
            <span>in Parana, Brazil</span>
          </MadeWith>
          <SourceCode>
            <a
              href="https://github.com/ghkich/website-meteor"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setSourceCodeHover(true)}
              onMouseLeave={() => setSourceCodeHover(false)}
            >
              <FontAwesomeIcon icon={faGithub} /> This website source code
            </a>
            <div>Meteor / React / Styled-components</div>
          </SourceCode>
        </div>
        <div style={{flex: 1}} />
        <Copyright>
          <div>Copyright © {new Date().getFullYear()} Gustavo Henrique Kich</div>
          <div>
            The background is using the Circuit Board SVG Pattern from{' '}
            <a href="https://www.heropatterns.com/" target="_blank" rel="noreferrer">
              Hero Patterns
            </a>{' '}
            by{' '}
            <a href="https://www.steveschoger.com/" target="_blank" rel="noreferrer">
              Steve Schoger
            </a>{' '}
          </div>
        </Copyright>
      </Footer>
    </BoxedLayout>
  )
}

HomePageComponent.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    }),
  ),
  appReady: PropTypes.bool.isRequired,
}

const BoxedLayout = styled.div`
  width: 100%;
  max-width: ${Spacing(80)};
  margin: 0 ${Spacing(1)};
`

const CardsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: ${Spacing(1)};
  row-gap: ${Spacing(1)};
  border-radius: ${Spacing(0.325)};

  ${Breakpoints.TABLET_L},
  ${Breakpoints.DUO_SCREEN_M} {
    grid-template-columns: 1fr 1fr;
  }

  ${Breakpoints.MOBILE_L} {
    grid-template-columns: 1fr;
    column-gap: ${Spacing(0.0625)};
    row-gap: ${Spacing(0.0625)};
    overflow: hidden;
  }
`

const Footer = styled.div`
  display: flex;
  padding: ${Spacing(1.5)} ${Spacing(0.625)};
  color: ${Colors.DARK_TEXT};
  font-size: 11px;
  font-weight: 200;
  text-align: left;
  line-height: ${Typography.LINE_HEIGHT_NORMAL};
  transition: opacity 0.2s;
  opacity: ${({appReady}) => (appReady ? 1 : 0)};
  
  a {
      transition: ${Transitions.COLORS};
      text-decoration: none;
      color: ${Colors.TEXT};

      ${Breakpoints.MOBILE_L} {
        color: ${Colors.LIGHT_TEXT};
      }

      :hover {
        color: ${Colors.LIGHT_PRIMARY};
      }
    }
  }

  ${Breakpoints.MOBILE_L} {
    flex-direction: column;
    font-size: 12px;
    color: ${Colors.TEXT};
    letter-spacing: 0.15px;
  }
`

const heartBeatAnimation = keyframes`
  0%, 50%, 100% { transform: scale(1, 1); color: ${Colors.PRIMARY}; }
  30%, 80% { transform: scale(1.2, 1.17); color: ${Colors.PRIMARY}; }
`

const MadeWith = styled.div`
  > svg {
    margin: 0 ${Spacing(0.125)};

    &:nth-child(1) {
      ${({$sourceCodeHover}) => {
        if ($sourceCodeHover)
          return css`
            animation: ${heartBeatAnimation} 2s infinite ease;
          `
      }};
    }

    &:nth-child(2) {
      font-size: 1.1em;
    }
  }
`

const SourceCode = styled.div`
  margin-top: ${Spacing(0.625)};

  a > svg {
    font-size: 12px;
    margin-right: ${Spacing(0.125)};
  }

  > div {
    margin-top: ${Spacing(0.125)};
  }
`

const Copyright = styled.div`
  max-width: ${Spacing(17)};
  text-align: right;

  > div:nth-child(2) {
    margin-top: ${Spacing(0.625)};
  }

  ${Breakpoints.MOBILE_L} {
    max-width: 100%;
    margin-top: ${Spacing(1)};
    padding-top: ${Spacing(1)};
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    text-align: left;
  }
`
