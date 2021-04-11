import 'normalize.css'
import React from 'react'
import styled from 'styled-components'
import {WorkExperiences} from './cards/WorkExperiences'
import {GitHub} from './cards/GitHub'
import {HeaderLogo} from './HeaderLogo'
import {ShortBio} from './cards/ShortBio'
import {HeaderContactInfo} from './HeaderContactInfo'
import PropTypes from 'prop-types'

const CardNames = {
  WORK_EXPERIENCES: 'work-experiences',
  SHORT_BIO: 'short-bio',
  GITHUB: 'github',
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
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 128px;
`

const CardsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 18px;
  row-gap: 18px;
`
