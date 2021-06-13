import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import styled, {css, keyframes} from 'styled-components'
import {Card, CardIcons} from '../../../components/Card'
import {Breakpoints, Colors, Spacing} from '../../../theme'
import {WorldMapImage} from '../../../images/WorldMap'
import {faChevronDown} from '@fortawesome/pro-regular-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {SkeletonTypes} from '../../../components/Skeleton'
import {WorldMapMethodRequests} from '../../../../api/world-map'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {LocationProptype, SelectLocation} from '../../../components/SelectLocation'
library.add(faChevronDown)

export const WorldMap = (props) => {
  const {data = [], loading} = useMethodRequest(WorldMapMethodRequests.FETCH)

  return <WorldMapComponent {...props} loading={loading} locations={data} />
}

export const WorldMapComponent = ({loading, locations, ...props}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (locations?.length > 0) {
      setSelectedIndex(0)
    }
  }, [locations])

  const handleShowNextLocation = () => {
    const nextIndex = selectedIndex + 1
    if (nextIndex < locations.length) {
      setSelectedIndex(nextIndex)
    } else {
      setSelectedIndex(0)
    }
  }

  const handleShowPreviousLocation = () => {
    const previousIndex = selectedIndex - 1
    if (previousIndex >= 0) {
      setSelectedIndex(previousIndex)
    } else {
      setSelectedIndex(locations.length - 1)
    }
  }

  return (
    <Card {...props} icon={CardIcons.WORLD} loading={loading} skeletonType={SkeletonTypes.MAP}>
      {locations.length > 0 && (
        <MainContainer>
          <SelectLocation
            selectedLocation={locations[selectedIndex]}
            onNextClick={handleShowNextLocation}
            onPreviousClick={handleShowPreviousLocation}
          />
          <MapContainer>
            {locations.map((location, index) => (
              <PinMap
                key={location._id}
                left={location.position.left}
                top={location.position.top}
                active={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
            <StyledWorldMapImage />
          </MapContainer>
        </MainContainer>
      )}
    </Card>
  )
}

WorldMapComponent.propTypes = {
  loading: PropTypes.bool,
  locations: PropTypes.arrayOf(LocationProptype).isRequired,
}

const MainContainer = styled.div`
  position: relative;
  z-index: 10;
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

const PinMap = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  left: ${({left}) => left}%;
  top: ${({top}) => top}%;
  z-index: 1;
  width: 10px;
  height: 10px;

  :before {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${Colors.LIGHT_SECONDARY};
    border: 1px solid transparent;
    margin-top: -3px;
    margin-left: -3px;
    position: absolute;
    left: 50%;
    top: 50%;
  }

  :after {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: 1px solid ${Colors.LIGHT_SECONDARY};
    margin-top: -3px;
    margin-left: -3px;
    position: absolute;
    left: 50%;
    top: 50%;
  }

  ${({active}) => {
    if (active) {
      return css`
        :before {
          width: 9px;
          height: 9px;
          margin-top: -5px;
          margin-left: -5px;
          background-color: ${Colors.SECONDARY};
        }

        :after {
          width: 9px;
          height: 9px;
          margin-top: -5px;
          margin-left: -5px;
          animation: ${pulsate} 1s ease-out infinite;
        }
      `
    }
  }}
`

const StyledWorldMapImage = styled(WorldMapImage)`
  width: 100%;
  color: rgba(255, 255, 255, 0.25);
`
