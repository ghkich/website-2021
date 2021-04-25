import PropTypes from 'prop-types'
import React from 'react'
import styled, {keyframes} from 'styled-components'
import {Card} from '../../../components/Card'
import {Colors} from '../../../theme'

export const WorldMap = (props) => {
  // const {data} = useMethodRequest(WorldMapMethodRequests.FETCH)
  //
  // const age = '32'

  return <WorldMapComponent {...props} />
}

export const WorldMapComponent = ({...props}) => {
  return (
    <Card {...props}>
      <MainContainer>
        <CurrentLocationPin />
        <img src="/images/world_map.png" alt="aaa" />
      </MainContainer>
    </Card>
  )
}

WorldMapComponent.propTypes = {
  title: PropTypes.string.isRequired,
}

const MainContainer = styled.div`
  position: relative;

  > img {
    opacity: 0.75;
    width: 100%;
  }
`

const pulsate = keyframes`
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(2.5, 2.5);
    opacity: 0;
  }
`

const CurrentLocationPin = styled.div`
  position: absolute;
  left: 33%;
  top: 73%;
  z-index: 1;

  :before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${Colors.PINK};
    border: 1px solid transparent;
    position: absolute;
    left: 0;
    top: 0;
  }

  :after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid ${Colors.LIGHTPINK};
    animation: ${pulsate} 1s ease-out infinite;
    position: absolute;
    left: 0;
    top: 0;
  }
`
