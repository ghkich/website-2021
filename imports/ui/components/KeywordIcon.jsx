import React from 'react'
import PropTypes from 'prop-types'
import {IconMeteor} from '../icons/IconMeteor'
import {IconReact} from '../icons/IconReact'
import {IconGatsby} from '../icons/IconGatsby'
import {IconPHP} from '../icons/IconPHP'
import {IconJQuery} from '../icons/IconJQuery'

export const KeywordTypes = {
  METEOR: 'meteor',
  REACT: 'react',
  GATSBY: 'gatsby',
  PHP: 'php',
  JQUERY: 'jquery',
}

const Keywords = {
  [KeywordTypes.METEOR]: {
    icon: IconMeteor,
    label: 'Meteor',
  },
  [KeywordTypes.REACT]: {
    icon: IconReact,
    label: 'React',
  },
  [KeywordTypes.GATSBY]: {
    icon: IconGatsby,
    label: 'Gatsby',
  },
  [KeywordTypes.PHP]: {
    icon: IconPHP,
    label: 'PHP',
  },
  [KeywordTypes.JQUERY]: {
    icon: IconJQuery,
    label: 'JQuery',
  },
}

export const KeywordIcon = ({keyword, ...props}) => {
  if (typeof Keywords[keyword] === 'undefined') return null
  const {icon: Icon, label} = Keywords[keyword]
  return <Icon title={label} {...props} />
}

KeywordIcon.propTypes = {
  keyword: PropTypes.oneOf(Object.values(KeywordTypes)),
}
