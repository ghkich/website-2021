import 'normalize.css'
import React from 'react'
import styled from 'styled-components'
import {WorkExperiences} from './cards/WorkExperiences'
import {GitHub} from './cards/GitHub'
import {HeaderLogo} from './HeaderLogo'
import {ShortBio} from './cards/ShortBio'
import {HeaderContactInfo} from './HeaderContactInfo'
import PropTypes from 'prop-types'
import {WorldMap} from './cards/WorldMap'
import {Card} from '../../components/Card'
import {Blog} from './cards/Blog'

const CardNames = {
  WORK_EXPERIENCES: 'work-experiences',
  SHORT_BIO: 'short-bio',
  GITHUB: 'github',
  WORLD_MAP: 'world-map',
  BLOG: 'blog',
}

export const Cards = [
  {
    name: CardNames.WORK_EXPERIENCES,
    title: 'Work Experiences',
    component: WorkExperiences,
  },
  {
    name: CardNames.SHORT_BIO,
    title: 'Short Bio',
    component: ShortBio,
  },
  {
    name: CardNames.GITHUB,
    title: 'GitHub',
    component: GitHub,
  },
  {
    name: 'skills',
    title: 'Skills',
    component: Card,
  },
  {
    name: CardNames.WORLD_MAP,
    title: 'World Map',
    component: WorldMap,
  },
  {
    name: CardNames.BLOG,
    title: 'Blog',
    component: Blog,
  },
]

export const HomePage = () => {
  return <HomePageComponent cards={Cards} />
}

export const HomePageComponent = ({cards}) => {
  return (
    <BoxedLayout>
      <Header>
        <HeaderLogo />
        <HeaderContactInfo />
      </Header>
      <CardsGrid>
        {cards?.map(({name, title, component: Component}) => (
          <Component key={name} title={title} />
        ))}
      </CardsGrid>
    </BoxedLayout>
  )
}

HomePageComponent.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    }),
  ),
}

const BoxedLayout = styled.div`
  width: 1300px;
  margin: 0 18px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 128px;
  margin: 0 8px;
`

const CardsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 18px;
  row-gap: 18px;
`
