import PropTypes from 'prop-types'
import React from 'react'
import styled, {keyframes} from 'styled-components'
import {Card, CardIcons} from '../../../components/Card'
import {Breakpoints, Colors, Spacing} from '../../../theme'
import {WorldMapImage} from '../../../images/WorldMap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/pro-regular-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {SkeletonTypes} from '../../../components/Skeleton'
library.add(faChevronDown)

export const WorldMap = (props) => {
  // const {data} = useMethodRequest(WorldMapMethodRequests.FETCH)
  //
  // const age = '32'

  return <WorldMapComponent {...props} loading={false} />
}

export const WorldMapComponent = ({loading, ...props}) => {
  return (
    <Card {...props} icon={CardIcons.WORLD} loading={loading} skeletonType={SkeletonTypes.TEXT}>
      <MainContainer>
        <Locations onClick={() => alert('Not yet implemented')}>
          <Selected>
            <span className="country">Brazil</span> - <span>Toledo, PR</span> - Current location
          </Selected>
          <FontAwesomeIcon icon={faChevronDown} />
        </Locations>
        <MapContainer>
          <CurrentLocationPin />
          <StyledWorldMapImage />
        </MapContainer>
      </MainContainer>
    </Card>
  )
}

WorldMapComponent.propTypes = {
  loading: PropTypes.bool,
}

const MainContainer = styled.div`
  position: relative;
  z-index: 10;
`

const Locations = styled.div`
  margin-bottom: ${Spacing(0.25)};
  padding: ${Spacing(0.825)};
  border-radius: ${Spacing(0.25)};
  border: ${Spacing(0.0625)} solid rgba(255, 255, 255, 0.03);
  background-color: rgba(255, 255, 255, 0.01);
  display: flex;
  align-items: center;
  font-weight: 200;

  > svg {
    margin-left: ${Spacing(0.625)};
    font-size: 11px;
    color: ${Colors.LIGHT_SECONDARY};
  }
`

const Selected = styled.div`
  flex: 1;
  font-weight: 200;
  font-size: 11px;
  color: ${Colors.TEXT};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  > span {
    font-weight: 400;
    color: ${Colors.LIGHT_SECONDARY};
  }

  > span.country {
    color: ${Colors.SECONDARY};
  }
`

const MapContainer = styled.div`
  position: relative;
  max-width: ${Spacing(18.5)};
  height: ${Spacing(11.2)};
  margin: ${Spacing(0.625)} auto 0;

  ${Breakpoints.MOBILE_S} {
    margin: ${Spacing(0.625)} auto 0;
  }

  ${Breakpoints.MOBILE_XS} {
    margin: ${Spacing(1.325)} auto 0;
    height: auto;
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
    background-color: ${Colors.SECONDARY};
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
    border: 1px solid ${Colors.LIGHT_SECONDARY};
    animation: ${pulsate} 1s ease-out infinite;
    position: absolute;
    left: 0;
    top: 0;
  }
`

const StyledWorldMapImage = styled(WorldMapImage)`
  width: 100%;
  color: rgba(255, 255, 255, 0.25);
`
