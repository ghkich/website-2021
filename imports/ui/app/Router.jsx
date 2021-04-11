import PropTypes from 'prop-types'

export const Switch = ({children: routes}) => {
  const currentPath = window.location.pathname
  return routes.filter((route) => route.props.path === currentPath)[0]
}

Switch.propTypes = {
  children: PropTypes.node.isRequired,
}
