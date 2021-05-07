import React from 'react'
import PropTypes from 'prop-types'

export const SvgImage = ({svg, className}) => <span className={className}>{svg}</span>

SvgImage.propTypes = {
  svg: PropTypes.node.isRequired,
  className: PropTypes.string,
}
