import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Breakpoints, Colors, Spacing, Transitions} from '../../ui/theme'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWhatsapp, faGithub, faInstagram, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faAt} from '@fortawesome/pro-light-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
library.add(faAt, faWhatsapp, faGithub, faInstagram, faLinkedin, faTwitter)

const NetworkCodeIcons = {
  github: faGithub,
  linkedin: faLinkedin,
  instagram: faInstagram,
  twitter: faTwitter,
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

  return (
    <MainContainer>
      <Links>
        <IconLink href={`https://wa.me/${phone}`}>
          <FontAwesomeIcon icon={faWhatsapp} />
        </IconLink>
        <LinksDivider />
        {networks?.map((network) => (
          <IconLink key={network.code} href={network.url} target="_blank">
            <FontAwesomeIcon icon={NetworkCodeIcons[network.code]} />
          </IconLink>
        ))}
      </Links>
      <Email href={`mailto:${email}`}>{email}</Email>
    </MainContainer>
  )
}

Contact.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape(ContactDataType),
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: ${Spacing(0.625)};

  ${Breakpoints.MOBILE_L} {
    column-gap: ${Spacing(1)};
  }
`

const LinksDivider = styled.div`
  height: ${Spacing(0.625)};
  width: ${Spacing(0.0625)};
  background-color: rgba(255, 255, 255, 0.1);

  ${Breakpoints.MOBILE_L} {
    margin-right: -${Spacing(0.3125)};
    margin-left: -${Spacing(0.3125)};
  }
`

const IconLink = styled.a`
  font-size: 16px;
  color: ${Colors.LIGHT_TEXT};
  transition: ${Transitions.COLORS};

  :hover {
    color: ${Colors.LIGHT_PRIMARY};
  }

  ${Breakpoints.MOBILE_L} {
    font-size: 18px;
  }
`

const Email = styled.a`
  margin-top: ${Spacing(0.45)};
  font-size: 13px;
  font-weight: 200;
  text-decoration: none;
  letter-spacing: 0.35px;
  color: ${Colors.TEXT};
  transition: ${Transitions.COLORS};

  :hover {
    color: ${Colors.LIGHT_PRIMARY};
  }

  ${Breakpoints.MOBILE_L} {
    letter-spacing: 0.75px;
    font-size: 14px;
  }
`
