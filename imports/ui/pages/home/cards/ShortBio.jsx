import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {ShortBioMethodRequests} from '../../../../api/short-bio'
import {useMethodRequest} from '../../../../infra/useMethodRequest'
import {Card} from '../../../components/Card'
import {Colors, Typography} from '../../../theme'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMugHot, faPlane, faCode, faGamepadAlt} from '@fortawesome/pro-solid-svg-icons'

export const ShortBio = ({title}) => {
  const {data} = useMethodRequest(ShortBioMethodRequests.FETCH)

  const age = '32'

  return <ShortBioComponent title={title} name={data.name} age={age} description={data.description} />
}

ShortBio.propTypes = {
  title: PropTypes.string.isRequired,
}

export const ShortBioComponent = ({title, name, age, description}) => {
  return (
    <Card title={title} rightSpot={<>Hello!</>}>
      <MainContainer>
        <AvatarDescription>
          <Avatar>
            <img alt={name} src="/images/avatar.jpeg" />
          </Avatar>
          <Description>
            <h3>
              Name: <b>{name}</b>
            </h3>
            <h3>Hometown: Brazil</h3>
            <h3>Age: {age} years</h3>
            <Icons>
              <div>
                <FontAwesomeIcon icon={faGamepadAlt} />
              </div>
              <div>
                <FontAwesomeIcon icon={faCode} />
              </div>
              <div>
                <FontAwesomeIcon icon={faPlane} />
              </div>
              <div>
                <FontAwesomeIcon icon={faMugHot} />
              </div>
            </Icons>
          </Description>
        </AvatarDescription>
        <Description>
          <p>{description}</p>
        </Description>
      </MainContainer>
    </Card>
  )
}

ShortBioComponent.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  age: PropTypes.string,
  description: PropTypes.string,
}

const MainContainer = styled.div``

const AvatarDescription = styled.div`
  display: flex;
`

const Avatar = styled.div`
  margin-right: 10px;

  > img {
    width: 96px;
    border-radius: 10px;
    border: 5px solid rgba(0, 0, 0, 0.15);
  }
`

const Icons = styled.div`
  flex: 1;
  margin: 10px 0;
  width: 100%;
  display: flex;
  font-size: 16px;

  > div {
    width: 36px;
    height: 36px;
    border-radius: 20%;
    border: 1px solid rgba(255, 255, 255, 0.075);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }
`

const Description = styled.div`
  flex: 1;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-weight: lighter;
  line-height: ${Typography.LINE_HEIGHT_NORMAL};

  > h3 {
    margin: 0;
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    font-weight: lighter;
    line-height: ${Typography.LINE_HEIGHT_NORMAL};
  }

  > p {
    padding: 0 5px;
  }
`
