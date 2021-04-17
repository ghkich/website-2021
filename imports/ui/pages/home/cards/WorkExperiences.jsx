import PropTypes from 'prop-types'
import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import {WorkExperiencesMethodRequests} from '../../../../api/work-experiences'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card} from '../../../components/Card'
import {Colors, Typography} from '../../../theme'
import {formatDate} from '../../../utils/formatters'
import {SkeletonTypes} from '../../../components/Skeleton'

export const WorkExperiences = ({title}) => {
  const [activeId, setActiveId] = useState('')

  const {data, loading} = useMethodRequest(WorkExperiencesMethodRequests.FETCH, {
    onSuccess: (data) => data?.length > 0 && setActiveId(data[0]._id),
  })

  return (
    <Card title={title} skeletonType={SkeletonTypes.TEXT} loading={loading}>
      {data.map((item, idx) => (
        <MainContainer key={item._id} active={item._id === activeId}>
          <Indicator active={item._id === activeId} />
          {idx < data.length - 1 && <Line />}
          <Header active={item._id === activeId} onClick={() => setActiveId(item._id === activeId ? '' : item._id)}>
            <h2>
              {item.jobTitle} <span>at {item.company}</span>
            </h2>
            <div>
              <span>{formatDate(item.startDate)}</span>
              <span> - </span>
              <span>{item.endDate ? formatDate(item.endDate) : 'Present'}</span>
            </div>
          </Header>
          <Body active={item._id === activeId}>
            <p>{item.description}</p>
          </Body>
        </MainContainer>
      ))}
    </Card>
  )
}

WorkExperiences.propTypes = {
  title: PropTypes.string.isRequired,
}

const MainContainer = styled.div`
  padding-bottom: 20px;
  margin-left: 5px;
  padding-left: 23px;
  position: relative;
`

const Indicator = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  top: 4px;

  ${(props) => {
    if (props.active) {
      return css`
        background-color: transparent;
        border-color: ${Colors.PINK};
      `
    }
  }}
`

const Line = styled.div`
  width: 1px;
  background-color: rgba(255, 255, 255, 0.075);
  position: absolute;
  top: 18px;
  bottom: 3px;
  left: 3px;
`

const Header = styled.div`
  cursor: pointer;

  > h2 {
    margin: 0 0 7px;
    color: ${Colors.BLUE};
    font-size: 13px;
    font-weight: normal;

    > span {
      color: ${Colors.LIGHTBLUE};
    }
  }

  > div {
    font-size: 12px;
    font-weight: lighter;
    color: rgba(255, 255, 255, 0.3);
  }

  ${(props) => {
    if (props.active) {
      return css`
        > h2 {
          color: ${Colors.BLUE};
        }
      `
    } else {
      return css`
        :hover {
          > h2 {
            color: ${Colors.LIGHTBLUE};
          }
        }
      `
    }
  }}
`

const Body = styled.div`
  max-height: 0;
  overflow-y: hidden;
  transition: max-height 0.3s linear;

  > p {
    margin-top: 15px;
    margin-bottom: 0;
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    font-weight: lighter;
    line-height: ${Typography.LINE_HEIGHT_NORMAL};
  }

  ${(props) => {
    if (props.active) {
      return css`
        max-height: 200px;
      `
    }
  }}
`
