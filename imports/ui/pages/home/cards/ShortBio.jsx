import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {ShortBioMethodRequests} from '../../../../api/short-bio'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card, CardIcons} from '../../../components/Card'
import {Breakpoints, Colors, Spacing, Typography} from '../../../theme'
import {SkeletonTypes} from '../../../components/Skeleton'
import {calculateAge} from '../../../utils/calculators'
import {formatDate} from '../../../utils/formatters'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode, faGamepadAlt, faMugHot, faPlaneAlt} from '@fortawesome/pro-light-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
library.add(faCode, faGamepadAlt, faMugHot, faPlaneAlt)

export const ShortBio = (props) => {
  const {data = {}, loading} = useMethodRequest(ShortBioMethodRequests.FETCH)

  return <ShortBioComponent {...props} loading={loading} data={data} />
}

export const ShortBioComponent = ({loading, data, ...props}) => {
  const {avatarSrc, name, birthdate, description} = data
  const age = calculateAge(birthdate)
  const birthdateFormatted = formatDate(birthdate, {year: 'numeric', month: 'short', day: 'numeric'})

  return (
    <Card {...props} icon={CardIcons.PROFILE} loading={loading} skeletonType={SkeletonTypes.BLOCKS}>
      {avatarSrc && (
        <MainContainer>
          <Profile>
            <Avatar>
              <img alt={name} src={avatarSrc} />
            </Avatar>
            <IdentificationLikes>
              <Identification>
                <h3>{name}</h3>
                <p>
                  {age} years <span>({birthdateFormatted})</span>
                </p>
              </Identification>
              <LikesComponent />
            </IdentificationLikes>
          </Profile>
          <LikesComponent className="on-avatar-bottom" />
          <Description>
            <p>{description}</p>
          </Description>
        </MainContainer>
      )}
    </Card>
  )
}

ShortBioComponent.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.shape({
    avatarSrc: PropTypes.string,
    name: PropTypes.string,
    birthdate: PropTypes.string,
    description: PropTypes.string,
  }),
}

const MainContainer = styled.div`
  padding: ${Spacing(0.325)};
`

const Profile = styled.div`
  display: flex;
  margin-bottom: ${Spacing(0.825)};
`

const Avatar = styled.div`
  width: ${Spacing(6)};
  height: ${Spacing(6)};
  margin-right: ${Spacing(1)};
  padding: ${Spacing(0.25)};
  border: ${Spacing(0.25)} solid rgba(255, 255, 255, 0.05);
  border-radius: ${Spacing(0.625)};
  flex: none;
  position: relative;

  :after {
    content: '';
    background-color: rgba(255, 255, 255, 0.02);
    margin: ${Spacing(0.25)};
    border-radius: ${Spacing(0.25)};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  }

  > img {
    width: 100%;
    border-radius: ${Spacing(0.25)};
    position: relative;
    z-index: 1;
  }

  ${Breakpoints.DESKTOP_S} {
    width: ${Spacing(5.25)};
    height: ${Spacing(5.25)};
  }

  ${Breakpoints.TABLET_L} {
    width: ${Spacing(6.8)};
    height: ${Spacing(6.8)};
  }

  ${Breakpoints.TABLET_M} {
    width: ${Spacing(6)};
    height: ${Spacing(6)};
  }

  ${Breakpoints.TABLET_S} {
    width: ${Spacing(5.25)};
    height: ${Spacing(5.25)};
  }

  ${Breakpoints.MOBILE_L} {
    width: ${Spacing(6.8)};
    height: ${Spacing(6.8)};
  }

  ${Breakpoints.MOBILE_M} {
    width: ${Spacing(6)};
    height: ${Spacing(6)};
  }

  ${Breakpoints.MOBILE_S} {
    width: ${Spacing(5.25)};
    height: ${Spacing(5.25)};
  }
`

const IdentificationLikes = styled.div`
  flex: 1;
`

const Identification = styled.div`
  margin: ${Spacing(0.5)} 0;

  > h3 {
    display: block;
    margin: 0 0 ${Spacing(0.25)} 0;
    font-size: 13px;
    font-weight: 300;
    line-height: ${Typography.LINE_HEIGHT_NORMAL};
    color: ${Colors.LIGHT_SECONDARY};
  }

  > p {
    margin: 0;
    font-size: 12px;
    font-weight: 200;
    line-height: ${Typography.LINE_HEIGHT_NORMAL};
    color: ${Colors.LIGHT_TEXT};

    > span {
      color: ${Colors.TEXT};
    }
  }
`

const LikesComponent = (props) => (
  <Likes {...props}>
    <div>
      <FontAwesomeIcon icon={faGamepadAlt} />
    </div>
    <div>
      <FontAwesomeIcon icon={faCode} />
    </div>
    <div>
      <FontAwesomeIcon icon={faPlaneAlt} style={{marginLeft: Spacing(0.125), marginBottom: Spacing(0.0625)}} />
    </div>
    <div>
      <FontAwesomeIcon icon={faMugHot} />
    </div>
  </Likes>
)

const Likes = styled.div`
  display: flex;
  margin-top: ${Spacing(0.75)};
  width: 100%;
  justify-content: space-between;
  column-gap: ${Spacing(0.425)};
  font-size: 16px;

  &.on-avatar-bottom {
    display: none;
  }

  > div {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: ${Spacing(2.6)};
    height: ${Spacing(2.6)};
    border: ${Spacing(0.0625)} solid rgba(255, 255, 255, 0.03);
    border-radius: ${Spacing(0.25)};
    background-color: rgba(255, 255, 255, 0.01);
    color: ${Colors.SECONDARY};
  }

  ${Breakpoints.DESKTOP_S} {
    column-gap: ${Spacing(0.3)};

    > div {
      width: ${Spacing(2.2)};
      height: ${Spacing(2.2)};
    }
  }

  ${Breakpoints.TABLET_L} {
    column-gap: ${Spacing(0.425)};
    font-size: 20px;

    > div {
      width: ${Spacing(3.2)};
      height: ${Spacing(3.2)};
    }
  }

  ${Breakpoints.TABLET_M} {
    column-gap: ${Spacing(0.425)};
    font-size: 18px;

    > div {
      width: ${Spacing(2.8)};
      height: ${Spacing(2.8)};
    }
  }

  ${Breakpoints.TABLET_S} {
    column-gap: ${Spacing(0.3)};
    font-size: 16px;

    > div {
      width: ${Spacing(2.2)};
      height: ${Spacing(2.2)};
    }
  }

  ${Breakpoints.MOBILE_L} {
    column-gap: ${Spacing(0.425)};
    font-size: 20px;

    > div {
      width: ${Spacing(3.2)};
      height: ${Spacing(3.2)};
    }
  }

  ${Breakpoints.MOBILE_M} {
    column-gap: ${Spacing(0.425)};
    font-size: 16px;

    > div {
      width: ${Spacing(2.6)};
      height: ${Spacing(2.6)};
    }
  }

  ${Breakpoints.MOBILE_S} {
    column-gap: ${Spacing(0.3)};
    font-size: 14px;

    > div {
      width: ${Spacing(2.2)};
      height: ${Spacing(2.2)};
    }
  }

  ${Breakpoints.MOBILE_XS} {
    display: none;

    &.on-avatar-bottom {
      display: flex;
      column-gap: ${Spacing(0.425)};
      margin-bottom: ${Spacing(1)};

      > div {
        width: ${Spacing(2.4)};
        height: ${Spacing(2.4)};
      }
    }
  }
`

const Description = styled.div`
  > p {
    margin: 0;
    padding: 0;
    font-size: 13px;
    font-weight: 200;
    line-height: ${Typography.LINE_HEIGHT_NORMAL};
    color: ${Colors.TEXT};
  }
`
