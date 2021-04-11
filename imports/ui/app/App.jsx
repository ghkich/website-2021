import 'normalize.css'
import React from 'react'
import styled from 'styled-components'
import {Colors} from '../theme'
import {routes} from './routes'
import {Switch} from './Router'

export const App = () => {
  return (
    <AppContainer>
      <Switch>
        {routes.map(({name, path, component: Component}) => (
          <Component key={name} path={path} />
        ))}
      </Switch>
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
