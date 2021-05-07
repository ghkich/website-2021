import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {WorkExperiencesMethodRequests} from '../../../../api/work-experiences'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card, CardIcons} from '../../../components/Card'
import {Colors, Spacing, Transitions, Typography} from '../../../theme'
import {formatDate} from '../../../utils/formatters'
import {SkeletonTypes} from '../../../components/Skeleton'
import {KeywordIcon, KeywordTypes} from '../../../components/KeywordIcon'

export const WorkExperiences = (props) => {
  const {data = [], loading} = useMethodRequest(WorkExperiencesMethodRequests.FETCH)

  return <WorkExperiencesComponent {...props} loading={loading} experiences={data} />
}

export const WorkExperiencesComponent = ({loading, experiences, ...props}) => {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (experiences?.length > 0) {
      setActiveId(experiences[0]._id)
    }
  }, [experiences])

  return (
    <Card {...props} icon={CardIcons.WORK} loading={loading} skeletonType={SkeletonTypes.TEXT}>
      {experiences.map((item, idx) => (
        <MainContainer key={item._id} active={item._id === activeId}>
          <Indicator active={item._id === activeId} />
          {idx < experiences.length - 1 && <Line />}
          <Header onClick={() => setActiveId(item._id === activeId ? '' : item._id)}>
            <div>
              <Title active={item._id === activeId}>
                {item.jobTitle} <span>at {item.company}</span>
              </Title>
              <SubTitle active={item._id === activeId}>
                <span>{item.startDate && formatDate(item.startDate)}</span>
                <span> - </span>
                <span>{item.endDate ? formatDate(item.endDate) : 'Present'}</span>
              </SubTitle>
            </div>
            {item.keywords.map((keyword) => (
              <StyledKeywordIcon key={keyword} keyword={keyword} active={item._id === activeId} />
            ))}
          </Header>
          <Body active={item._id === activeId}>
            <p>{item.description}</p>
          </Body>
        </MainContainer>
      ))}
    </Card>
  )
}

WorkExperiencesComponent.propTypes = {
  loading: PropTypes.bool,
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.oneOf(Object.values(KeywordTypes))),
      description: PropTypes.string.isRequired,
    }),
  ),
}

const MainContainer = styled.div`
  padding-bottom: ${Spacing(1)};
  margin-left: ${Spacing(0.25)};
  padding-left: ${Spacing(1.5)};
  position: relative;
`

const Indicator = styled.div`
  width: ${Spacing(0.1875)};
  height: ${Spacing(0.1875)};
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: ${Spacing(0.125)} solid transparent;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  top: ${Spacing(0.25)};

  ${(props) => {
    if (props.active) {
      return css`
        background-color: transparent;
        border-color: ${Colors.SECONDARY};
      `
    }
  }}
`

const Line = styled.div`
  width: ${Spacing(0.0625)};
  background-color: rgba(255, 255, 255, 0.075);
  position: absolute;
  top: ${Spacing(1.125)};
  bottom: ${Spacing(0.1875)};
  left: ${Spacing(0.1875)};
`

const Header = styled.div`
  display: flex;
  cursor: pointer;

  > div {
    flex: 1;
  }
`

const Title = styled.h2`
  flex: 1;
  margin: 0 0 ${Spacing(0.425)};
  color: ${({active}) => (active ? Colors.SECONDARY : Colors.LIGHT_TEXT)};
  font-size: 13px;
  font-weight: normal;
  transition: ${Transitions.COLORS};

  > span {
    font-weight: 200;
    font-style: italic;
    color: ${({active}) => (active ? Colors.LIGHT_SECONDARY : Colors.TEXT)};
    transition: ${Transitions.COLORS};
  }

  ${Header}:hover & {
    color: ${Colors.SECONDARY};

    > span {
      color: ${Colors.LIGHT_SECONDARY};
    }
  }
`

const StyledKeywordIcon = styled(KeywordIcon)`
  margin-left: ${Spacing(0.425)};
  color: ${({active}) => (active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)')};
  font-size: 1.35em;
  transition: ${Transitions.COLORS};
`

const SubTitle = styled.h3`
  margin: 0;
  font-size: 11px;
  font-weight: 200;
  color: ${({active}) => (active ? Colors.LIGHT_TEXT : Colors.TEXT)};
  transition: ${Transitions.COLORS};
`

const Body = styled.div`
  max-height: 0;
  overflow-y: hidden;
  transition: max-height 0.3s linear;

  > p {
    margin-top: ${Spacing(0.625)};
    margin-bottom: 0;
    font-size: 13px;
    font-weight: 200;
    line-height: ${Typography.LINE_HEIGHT_NORMAL};
    color: ${Colors.TEXT};
  }

  ${({active}) => {
    if (active) {
      return css`
        max-height: ${Spacing(10)};
      `
    }
  }}
`
