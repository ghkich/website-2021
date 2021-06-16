import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {Card, CardIcons} from '../../../components/Card'
import {Breakpoints, Colors, Spacing, Transitions, Typography} from '../../../theme'
import {SkillsMethodRequests} from '../../../../api/skills'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {SkeletonTypes} from '../../../components/Skeleton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComments, faBrain, faBullseye, faHeart} from '@fortawesome/pro-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
library.add(faComments, faBrain, faBullseye, faHeart)

export const SkillTypes = {
  COMMUNICATION: 'communication',
  THINKING: 'thinking',
  FOCUS: 'focus',
  PASSION: 'passion',
}

const SkillsIcons = {
  [SkillTypes.COMMUNICATION]: faComments,
  [SkillTypes.THINKING]: faBrain,
  [SkillTypes.FOCUS]: faBullseye,
  [SkillTypes.PASSION]: faHeart,
}

export const Skills = (props) => {
  const {data = [], loading} = useMethodRequest(SkillsMethodRequests.FETCH)

  return <SkillsComponent {...props} loading={loading} skills={data} />
}

export const SkillsComponent = ({loading, skills, ...props}) => {
  const [activeId, setActiveId] = useState('')
  const [activeSkillChanged, setActiveSkillChanged] = useState()

  useEffect(() => {
    if (skills?.length > 0) {
      setActiveId(skills[0]._id)
    }
  }, [skills])

  useEffect(() => {
    if (activeSkillChanged === false) {
      setActiveSkillChanged(true)
      setTimeout(() => {
        setActiveSkillChanged(false)
      }, 200)
    }
    if (activeSkillChanged === undefined) {
      setActiveSkillChanged(false)
    }
  }, [activeId])

  return (
    <Card {...props} icon={CardIcons.SKILLS} loading={loading} skeletonType={SkeletonTypes.DOUBLE_ROW}>
      <MainContainer>
        <SkillsTabs>
          {skills.map((skill) => (
            <SkillItem key={skill._id} $active={skill._id === activeId} onClick={() => setActiveId(skill._id)}>
              <FontAwesomeIcon icon={SkillsIcons[skill.type]} />
            </SkillItem>
          ))}
        </SkillsTabs>
        <Description $activeSkillChanged={activeSkillChanged}>
          {skills.map(
            (skill) =>
              skill._id === activeId && (
                <div key={skill._id}>
                  <h1>
                    <FontAwesomeIcon icon={SkillsIcons[skill.type]} /> {skill.name}
                  </h1>
                  <p>{skill.description}</p>
                </div>
              ),
          )}
        </Description>
      </MainContainer>
    </Card>
  )
}

SkillsComponent.propTypes = {
  loading: PropTypes.bool,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(SkillTypes)),
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
}

const MainContainer = styled.div`
  position: relative;

  ${Breakpoints.MOBILE_S} {
    padding: 0;
  }
`

const SkillsTabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: ${Spacing(0.625)};
`

const SkillItem = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: ${Spacing(0.825)} 0;
  border-radius: ${Spacing(0.125)};
  border: 1px solid rgba(255, 255, 255, 0.03);
  aspect-ratio: 1;
  font-size: 40px;
  cursor: pointer;
  transition: ${Transitions.COLORS};
  color: ${Colors.TEXT};
  background-color: rgba(255, 255, 255, 0.01);

  ${Breakpoints.DESKTOP_S} {
    padding: ${Spacing(0.625)} 0;
    font-size: 32px;
  }

  ${Breakpoints.TABLET_L} {
    padding: ${Spacing(0.9)} 0;
    font-size: 50px;
  }

  ${Breakpoints.TABLET_M} {
    padding: ${Spacing(0.825)} 0;
    font-size: 40px;
  }

  ${Breakpoints.TABLET_S} {
    padding: ${Spacing(0.625)} 0;
    font-size: 35px;
  }

  ${Breakpoints.MOBILE_L} {
    padding: ${Spacing(1.25)} 0;
    font-size: 60px;
  }

  ${Breakpoints.MOBILE_M} {
    padding: ${Spacing(1)} 0;
    font-size: 45px;
  }

  ${Breakpoints.MOBILE_S} {
    padding: ${Spacing(0.825)} 0;
    font-size: 35px;
  }

  ${Breakpoints.MOBILE_XS} {
    padding: ${Spacing(0.625)} 0;
    font-size: 20px;
  }

  ${({$active}) => {
    if ($active) {
      return css`
        background-color: rgba(255, 255, 255, 0.03);
        border-color: rgba(255, 255, 255, 0.07);
        color: ${Colors.SECONDARY};
      `
    } else {
      return css`
        :hover {
          background-color: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.05);
          color: ${Colors.LIGHT_SECONDARY};
        }
      `
    }
  }}

  :active {
    background-color: rgba(255, 255, 255, 0.01);
    border-color: rgba(255, 255, 255, 0.03);
  }
`

const Description = styled.div`
  margin-top: ${Spacing(0.75)};
  padding: ${Spacing(1)};
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03);
  position: relative;
  transition: ${Transitions.COLORS};

  ${({$activeSkillChanged}) => {
    if ($activeSkillChanged) {
      return css`
        border-color: rgba(255, 255, 255, 0.05);
        background-color: rgba(255, 255, 255, 0.02);
      `
    }
  }}

  > div {
    > h1 {
      margin-top: 0;
      font-size: 13px;
      font-weight: normal;
      color: ${Colors.SECONDARY};
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      padding-bottom: ${Spacing(1)};
      margin-bottom: ${Spacing(0.75)};

      > svg {
        margin-right: 3px;
        color: rgba(255, 255, 255, 0.2);
      }
    }

    > p {
      margin: 0;
      padding: 0;
      font-size: 13px;
      font-weight: 200;
      line-height: ${Typography.LINE_HEIGHT_NORMAL};
      color: ${Colors.TEXT};
    }
  }
`
