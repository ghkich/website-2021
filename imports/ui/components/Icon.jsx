import React from 'react'
import PropTypes from 'prop-types'

export const Icon = ({svg, ...props}) => <span {...props}>{svg}</span>

Icon.propTypes = {
  svg: PropTypes.node.isRequired,
}
