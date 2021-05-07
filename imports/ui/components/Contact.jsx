import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {faGithub, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import {faAt} from '@fortawesome/pro-light-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Spacing} from '../../ui/theme'

const ICONS_BY_CODE = {
  github: faGithub,
  linkedin: faLinkedin,
  instagram: faInstagram,
}

export const ContactDataType = {
  phone: PropTypes.string,
  email: PropTypes.string,
  networks: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
}

export const Contact = ({data}) => {
  const {phone, email, networks} = data
  const [codeArea, phoneNumber] = phone.split(/ (.+)/)

  return (
    <MainContainer>
      <Links>
        <IconLink title={`Send email to: ${email}`} href={`mailto:${email}`}>
          <FontAwesomeIcon icon={faAt} />
        </IconLink>
        <LinksDivider />
        {networks?.map((network) => (
          <IconLink key={network.code} href={network.url} target="_blank">
            <FontAwesomeIcon icon={ICONS_BY_CODE[network.code]} />
          </IconLink>
        ))}
      </Links>
      <Phone>
        <span>{codeArea}</span> {phoneNumber}
      </Phone>
    </MainContainer>
  )
}

Contact.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape(ContactDataType),
}

const MainContainer = styled.div``

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const LinksDivider = styled.div`
  height: ${Spacing(0.625)};
  width: ${Spacing(0.0625)};
  margin-left: ${Spacing(0.625)};
  background-color: rgba(255, 255, 255, 0.1);
`

const IconLink = styled.a`
  margin-left: ${Spacing(0.625)};
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.15s linear;

  :hover {
    color: rgba(255, 255, 255, 0.6);
  }
`

const Phone = styled.div`
  margin-top: ${Spacing(0.45)};
  font-size: 13px;
  color: rgba(255, 255, 255, 0.25);

  > span {
    color: rgba(255, 255, 255, 0.15);
  }
`
