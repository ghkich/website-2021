import 'normalize.css'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {WorkExperiences} from './cards/WorkExperiences'
import {GitHub} from './cards/GitHub'
import {HeaderLogo} from './HeaderLogo'
import {ShortBio} from './cards/ShortBio'
import PropTypes from 'prop-types'
import {WorldMap} from './cards/WorldMap'
import {Blog} from './cards/Blog'
import {Breakpoints, Colors, Spacing, Transitions, Typography} from '../../theme'
import {Contact, ContactDataType} from '../../components/Contact'
import {PERSONAL_INFO_DATA} from '../../../infra/data/personal-info'
import {MAX_WIDTH_XS} from '../../theme/config/breakpoints'
import {Skills} from './cards/Skills'
import {faHeart, faCoffee} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
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
  const {email, phone, networks} = PERSONAL_INFO_DATA
  return <HomePageComponent cards={cards} contactData={{email, phone, networks}} />
}

export const HomePageComponent = ({cards, contactData}) => {
  const [activeCardId, setActiveCardId] = useState()
  const [isSmallScreen, setIsSmallScreen] = useState()

  useEffect(() => {
    setIsSmallScreen(window.matchMedia(MAX_WIDTH_XS).matches)
  }, [])

  // wait matchMedia().matches before rendering
  if (isSmallScreen === undefined) return null

  return (
    <BoxedLayout>
      <Header>
        <HeaderLogo />
        <HeaderContact>
          <Contact data={contactData} />
        </HeaderContact>
      </Header>
      <CardsGrid>
        {cards?.map(({id, title, component: Component}) => (
          <Component
            key={id}
            title={title}
            active={isSmallScreen ? activeCardId === id : true}
            onHeaderClick={() => isSmallScreen && setActiveCardId((prev) => (prev !== id ? id : undefined))}
          />
        ))}
      </CardsGrid>
      <Footer>
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
        <FooterContact>
          <Contact data={contactData} />
        </FooterContact>
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
  contactData: PropTypes.shape(ContactDataType),
}

const BoxedLayout = styled.div`
  width: 100%;
  max-width: ${Spacing(80)};
  margin: 0 ${Spacing(1)};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${Spacing(7)};
  margin: 0 ${Spacing(1)};
`

const HeaderContact = styled.div`
  display: none;

  ${Breakpoints.XS} {
    display: block;
  }
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
  margin: ${Spacing(2)} auto;
`

const MadeAndCopyright = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const MadeWith = styled.span`
  display: block;
  color: ${Colors.DARK_TEXT};
  font-size: 10px;
  text-align: center;

  ${Breakpoints.XS} {
    display: inline;
  }

  // > svg:nth-child(1) {
  //   color: ${Colors.PRIMARY};
  // }
`

const Copyright = styled.span`
  display: block;
  margin: ${Spacing(0.625)} auto;
  max-width: ${Spacing(18)};
  color: ${Colors.DARK_TEXT};
  font-size: 10px;
  text-align: center;
  opacity: 0.5;
  line-height: ${Typography.LINE_HEIGHT_NORMAL};

  > a {
    transition: ${Transitions.COLORS};
    text-decoration: none;
    color: ${Colors.TEXT};

    :hover {
      color: ${Colors.LIGHT_TEXT};
    }
  }

  ${Breakpoints.XS} {
    display: inline;
  }
`

const FooterContact = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${Spacing(1.5)} 0;

  ${Breakpoints.XS} {
    display: none;
  }
`
