import 'normalize.css'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {WorkExperiences} from './cards/WorkExperiences'
import {GitHub} from './cards/GitHub'
import {HeaderLogo} from './HeaderLogo'
import {ShortBio} from './cards/ShortBio'
import PropTypes from 'prop-types'
import {WorldMap} from './cards/WorldMap'
import {Card} from '../../components/Card'
import {Blog} from './cards/Blog'
import {Breakpoints, Spacing} from '../../theme'
import {Contact, ContactDataType} from '../../components/Contact'
import {PERSONAL_INFO_DATA} from '../../../infra/data/personal-info'

const CardNames = {
  WORK_EXPERIENCES: 'work-experiences',
  SHORT_BIO: 'short-bio',
  GITHUB: 'github',
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
    id: 'skills',
    title: 'Skills',
    component: Card,
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
  const [isMobile, setIsMobile] = useState()

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 500px)').matches)
  }, [])

  // wait for matchMedia
  if (isMobile === undefined) return null

  return (
    <BoxedLayout>
      <Header>
        <HeaderLogo />
        <ContactContainer>
          <Contact data={contactData} />
        </ContactContainer>
      </Header>
      <CardsGrid>
        {cards?.map(({id, title, component: Component}) => (
          <Component
            key={id}
            title={title}
            active={isMobile ? activeCardId === id : true}
            onHeaderClick={() => isMobile && setActiveCardId((prev) => (prev !== id ? id : undefined))}
          />
        ))}
      </CardsGrid>
      <Footer>
        <Contact data={contactData} />
      </Footer>
    </BoxedLayout>
  )
}

HomePageComponent.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
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

const ContactContainer = styled.div`
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${Spacing(1.5)} 0;

  ${Breakpoints.XS} {
    display: none;
  }
`
