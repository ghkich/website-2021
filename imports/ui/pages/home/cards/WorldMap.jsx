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
      const currentLocationIndex = locations.findIndex((location) => location.isCurrent)
      setSelectedIndex(currentLocationIndex)
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
      {locations?.length > 0 && (
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
                onClick={() => setSelectedIndex(index)}
                $left={location.position.left}
                $top={location.position.top}
                $active={index === selectedIndex}
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
  locations: PropTypes.arrayOf(LocationProptype),
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
  margin-bottom: -${Spacing(0.75)} !important;

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
  left: ${({$left}) => $left}%;
  top: ${({$top}) => $top}%;
  z-index: 1;
  width: ${Spacing(0.625)};
  height: ${Spacing(0.625)};

  :before {
    content: '';
    display: block;
    width: ${Spacing(0.3125)};
    height: ${Spacing(0.3125)};
    border-radius: 50%;
    background-color: ${Colors.LIGHT_SECONDARY};
    border: ${Spacing(0.0625)} solid transparent;
    margin-top: -${Spacing(0.1875)};
    margin-left: -${Spacing(0.1875)};
    position: absolute;
    left: 50%;
    top: 50%;
  }

  :after {
    content: '';
    display: block;
    width: ${Spacing(0.3125)};
    height: ${Spacing(0.3125)};
    border-radius: 50%;
    border: ${Spacing(0.0625)} solid ${Colors.LIGHT_SECONDARY};
    margin-top: -${Spacing(0.1875)};
    margin-left: -${Spacing(0.1875)};
    position: absolute;
    left: 50%;
    top: 50%;
  }

  ${({$active}) => {
    if ($active) {
      return css`
        :before {
          width: ${Spacing(0.5625)};
          height: ${Spacing(0.5625)};
          margin-top: -${Spacing(0.3125)};
          margin-left: -${Spacing(0.3125)};
          background-color: ${Colors.SECONDARY};
        }

        :after {
          width: ${Spacing(0.5625)};
          height: ${Spacing(0.5625)};
          margin-top: -${Spacing(0.3125)};
          margin-left: -${Spacing(0.3125)};
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
