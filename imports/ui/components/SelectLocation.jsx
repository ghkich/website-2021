import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {Breakpoints, Colors, Spacing, Transitions} from '../theme'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/pro-regular-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {formatDate} from '../utils/formatters'
library.add(faAngleLeft, faAngleRight)

export const SelectLocation = ({selectedLocation, onPreviousClick, onNextClick}) => {
  const [locationChanged, setLocationChanged] = useState()

  useEffect(() => {
    if (locationChanged === false) {
      setLocationChanged(true)
      setTimeout(() => {
        setLocationChanged(false)
      }, 200)
    }
    if (locationChanged === undefined) {
      setLocationChanged(false)
    }
  }, [selectedLocation])

  return (
    <MainContainer>
      <Select>
        <button onClick={onPreviousClick}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <LocationItem $locationChanged={locationChanged}>
          <div>
            <span className="country">{selectedLocation.country}</span> - <span>{selectedLocation.location}</span>
          </div>
          <span>
            {selectedLocation.isCurrent ? 'Current location' : `Visited on ${formatDate(selectedLocation.lastVisit)}`}
          </span>
        </LocationItem>
        <button onClick={onNextClick}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </Select>
    </MainContainer>
  )
}

export const LocationProptype = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  lastVisit: PropTypes.string,
  position: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }).isRequired,
})

SelectLocation.propTypes = {
  selectedLocation: LocationProptype,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}

const MainContainer = styled.div``

const Select = styled.div`
  margin-bottom: ${Spacing(0.25)};
  display: flex;
  align-items: center;

  > button {
    flex: none;
    width: ${Spacing(2.9375)};
    height: ${Spacing(2.9375)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${Spacing(0.125)};
    border: ${Spacing(0.0625)} solid rgba(255, 255, 255, 0.03);
    background-color: rgba(255, 255, 255, 0.01);
    transition: ${Transitions.COLORS};
    cursor: pointer;

    :hover {
      border-color: rgba(255, 255, 255, 0.05);
      background-color: rgba(255, 255, 255, 0.03);
    }

    :active {
      background-color: rgba(255, 255, 255, 0.01);
      border-color: rgba(255, 255, 255, 0.03);
    }

    > svg {
      font-size: 18px;
      color: ${Colors.LIGHT_SECONDARY};
    }
  }
`

const LocationItem = styled.div`
  flex: 1;
  padding: ${Spacing(0.5)};
  margin: 0 ${Spacing(0.5)};
  border-radius: ${Spacing(0.125)};
  border: ${Spacing(0.0625)} solid rgba(255, 255, 255, 0.03);
  background-color: rgba(255, 255, 255, 0.01);
  font-size: 11px;
  color: ${Colors.LIGHT_TEXT};
  font-weight: 200;
  text-align: center;
  overflow: hidden;

  ${({$locationChanged}) => {
    if ($locationChanged) {
      return css`
        border-color: rgba(255, 255, 255, 0.05);
        background-color: rgba(255, 255, 255, 0.02);
      `
    }
  }}

  ${Breakpoints.MOBILE_S} {
    margin: 0 ${Spacing(0.35)};
  }

  ${Breakpoints.MOBILE_XS} {
    margin: 0 ${Spacing(0.25)};
  }

  > div {
    margin-bottom: ${Spacing(0.25)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > span {
      font-size: 12px;
      font-weight: 300;
      color: ${Colors.SECONDARY};
    }

    > span.country {
      color: ${Colors.LIGHT_SECONDARY};
    }
  }
`
