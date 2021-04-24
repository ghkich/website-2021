import React from 'react'
import styled from 'styled-components'
import {useMethodRequest} from '../../../infra/useMethodRequest'
import PropTypes from 'prop-types'
import {ContactInfoMethodRequests} from '../../../api/contact-info'
import {faGithub, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import {faAt} from '@fortawesome/pro-light-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Spacing} from '../../theme'

const ICONS_BY_CODE = {
  github: faGithub,
  linkedin: faLinkedin,
  instagram: faInstagram,
}

export const HeaderContactInfo = () => {
  const {data} = useMethodRequest(ContactInfoMethodRequests.FETCH)

  return <ContactInfoComponent phone={data.phone} email={data.email} networks={data.networks} />
}

export const ContactInfoComponent = ({phone, email, networks}) => {
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
      <Phone>{phone}</Phone>
    </MainContainer>
  )
}

ContactInfoComponent.propTypes = {
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
  font-size: 18px;
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.15s linear;

  :hover {
    color: rgba(255, 255, 255, 0.6);
  }
`

const Phone = styled.div`
  margin-top: ${Spacing(0.45)};
  font-size: 14px;
  color: rgba(255, 255, 255, 0.2);
`
