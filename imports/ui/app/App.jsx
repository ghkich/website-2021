import 'normalize.css'
import React from 'react'
import styled from 'styled-components'
import {Experiences} from '../cards/Experiences'
import {GitHub} from '../cards/GitHub'
import {Card} from '../components/Card'
import {Logo} from '../components/Logo'
import {Colors} from '../theme'

export const App = () => {
  return (
    <AppContainer>
      <BoxedLayout>
        <Header>
          <Logo />
        </Header>
        <CardsGrid>
          <Experiences title="Work Experiences" />
          <Card title="Short Bio"></Card>
          <GitHub title="GitHub" />
          <Card title="Skills" />
          <Card title="Travels" />
          <Card title="Blog" />
        </CardsGrid>
      </BoxedLayout>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-image: linear-gradient(
    165deg,
    ${Colors.DARKINDIGO} 0%,
    ${Colors.INDIGO} 30%,
    ${Colors.PURPLE} 70%,
    ${Colors.DARKMAGENTA} 100%
  );
`

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
  column-gap: 24px;
  row-gap: 24px;
`
