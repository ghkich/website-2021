import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {ShortBioMethodRequests} from '../../../../api/short-bio'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card, CardIcons} from '../../../components/Card'
import {Colors, Spacing, Typography} from '../../../theme'
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
            <div>
              <Identification>
                <h3>{name}</h3>
                <p>
                  {age} years <span>({birthdateFormatted})</span>
                </p>
              </Identification>
              <Likes>
                <div>
                  <FontAwesomeIcon icon={faGamepadAlt} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faCode} />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faPlaneAlt}
                    style={{marginLeft: Spacing(0.125), marginBottom: Spacing(0.0625)}}
                  />
                </div>
                <div>
                  <FontAwesomeIcon icon={faMugHot} />
                </div>
              </Likes>
            </div>
          </Profile>
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

  > img {
    width: 100%;
    border-radius: ${Spacing(0.25)};
  }
`

const Identification = styled.div`
  margin: ${Spacing(0.5)} 0;

  > h3 {
    display: block;
    margin: 0 0 ${Spacing(0.425)} 0;
    font-size: 13px;
    font-weight: 300;
    color: ${Colors.LIGHT_SECONDARY};
  }

  > p {
    margin: 0;
    font-size: 12px;
    font-weight: 200;
    color: ${Colors.LIGHT_TEXT};

    > span {
      color: ${Colors.TEXT};
    }
  }
`

const Likes = styled.div`
  flex: 1;
  margin-top: ${Spacing(1.15)};
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;

  > div {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${Spacing(2.6)};
    height: ${Spacing(2.6)};
    margin-right: ${Spacing(0.425)};
    border: ${Spacing(0.0625)} solid rgba(255, 255, 255, 0.03);
    border-radius: ${Spacing(0.25)};
    background-color: rgba(255, 255, 255, 0.01);
    color: ${Colors.SECONDARY};
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
