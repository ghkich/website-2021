import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {WorkExperiences} from './cards/WorkExperiences'
import {GitHub} from './cards/GitHub'
import {Header} from './Header'
import {ShortBio} from './cards/ShortBio'
import PropTypes from 'prop-types'
import {WorldMap} from './cards/WorldMap'
import {Blog} from './cards/Blog'
import {Breakpoints, Colors, Spacing, Transitions, Typography} from '../../theme'
import {MAX_WIDTH_XS} from '../../theme/config/breakpoints'
import {Skills} from './cards/Skills'
import {faHeart, faCoffee} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {useAppSelectors} from '../../app/AppContext'
library.add(faHeart, faCoffee)

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

  useEffect(() => {
    setIsSmallScreen(window.matchMedia(MAX_WIDTH_XS).matches)
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
        <MadeAndCopyright>
          <MadeWith>
            Made with <FontAwesomeIcon icon={faHeart} /> and <FontAwesomeIcon icon={faCoffee} />{' '}
            <span>in Parana, Brazil</span>
          </MadeWith>
          <Copyright>
            The background and skills are using the Circuit Board SVG Pattern from{' '}
            <a href="https://www.heropatterns.com/" target="_blank" rel="noreferrer">
              Hero Patterns
            </a>{' '}
            by{' '}
            <a href="https://www.steveschoger.com/" target="_blank" rel="noreferrer">
              Steve Schoger
            </a>{' '}
          </Copyright>
        </MadeAndCopyright>
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
  grid-template-columns: 1fr;
  column-gap: ${Spacing(0.625)};
  row-gap: ${Spacing(0.625)};

  ${Breakpoints.XS} {
    grid-template-columns: 1fr 1fr;
    column-gap: ${Spacing(1)};
    row-gap: ${Spacing(1)};
  }

  ${Breakpoints.XL} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const Footer = styled.div`
  margin: ${Spacing(2.25)} 0;
  transition: opacity 0.2s;
  opacity: ${({appReady}) => (appReady ? 1 : 0)};
`

const MadeAndCopyright = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const MadeWith = styled.span`
  display: block;
  color: ${Colors.DARK_TEXT};
  font-size: 11px;
  font-weight: 200;
  text-align: left;

  ${Breakpoints.XS} {
    display: inline;
  }
`

const Copyright = styled.span`
  display: block;
  margin: ${Spacing(0.625)} 0;
  max-width: ${Spacing(18)};
  color: ${Colors.DARK_TEXT};
  font-size: 11px;
  font-weight: 200;
  text-align: left;
  line-height: ${Typography.LINE_HEIGHT_NORMAL};

  > a {
    transition: ${Transitions.COLORS};
    text-decoration: none;
    color: ${Colors.TEXT};

    :hover {
      color: ${Colors.LIGHT_PRIMARY};
    }
  }

  ${Breakpoints.XS} {
    display: inline;
  }
`
