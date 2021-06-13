import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {Breakpoints, Colors, Spacing, Transitions} from '../theme'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/pro-regular-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {formatDate} from '../utils/formatters'
library.add(faChevronLeft, faChevronRight)

export const SelectLocation = ({selectedLocation, onPreviousClick, onNextClick}) => {
  return (
    <MainContainer>
      <Select>
        <button onClick={onPreviousClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <LocationItem>
          <div>
            <span className="country">{selectedLocation.country}</span> - <span>{selectedLocation.location}</span>
          </div>
          <span>
            {selectedLocation.isCurrent ? 'Current location' : `Visited on ${formatDate(selectedLocation.lastVisit)}`}
          </span>
        </LocationItem>
        <button onClick={onNextClick}>
          <FontAwesomeIcon icon={faChevronRight} />
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
  locations: PropTypes.arrayOf(LocationProptype).isRequired,
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
    border: ${Spacing(0.0625)} solid rgba(255, 255, 255, 0.03);
    background-color: rgba(255, 255, 255, 0.01);
    transition: ${Transitions.COLORS};
    cursor: pointer;

    :hover {
      border-color: rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.03);
    }

    > svg {
      font-size: 12px;
      color: ${Colors.LIGHT_SECONDARY};
    }
  }
`

const LocationItem = styled.div`
  flex: 1;
  padding: ${Spacing(0.5)};
  margin: 0 ${Spacing(0.5)};
  border: ${Spacing(0.0625)} solid rgba(255, 255, 255, 0.03);
  background-color: rgba(0, 0, 0, 0.03);
  font-size: 11px;
  color: ${Colors.LIGHT_TEXT};
  font-weight: 200;
  text-align: center;
  overflow: hidden;

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
