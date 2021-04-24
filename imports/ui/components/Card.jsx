import PropTypes from 'prop-types'
import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import styled from 'styled-components'
import {Colors, Spacing} from '../theme'
import {Skeleton, SkeletonTypes} from './Skeleton'

// export const CardErrorBoundary = ({error, children, onFixButtonClick}) => {
//   if (error) {
//     return (
//       <div>
//         {error} <button onClick={() => onFixButtonClick()}>Fix</button>
//       </div>
//     )
//   } else {
//     return children
//   }
// }

// CardErrorBoundary.propTypes = {
//   error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
//   children: PropTypes.node.isRequired,
//   onFixButtonClick: PropTypes.func,
// }

export const Card = ({title, rightSpot, skeletonType, loading, children}) => {
  return (
    <CardContainer>
      <Header>
        <h1>{title}</h1>
        <h3>{rightSpot}</h3>
      </Header>
      <HeaderShadow />
      <StyledSimpleBar>
        <Body>
          <Skeleton type={skeletonType} loading={loading}>
            {children}
          </Skeleton>
        </Body>
      </StyledSimpleBar>
    </CardContainer>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  rightSpot: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  skeletonType: PropTypes.oneOf(Object.values(SkeletonTypes)),
  loading: PropTypes.bool,
  children: PropTypes.node,
}

const CardStyle = {
  HEIGHT: Spacing(17),
  HEADER_HEIGHT: Spacing(3),
  RADIUS: Spacing(0.3),
  PADDING: Spacing(1),
}

const CardContainer = styled.div`
  border-radius: ${CardStyle.RADIUS};
  background-color: rgba(0, 0, 0, 0.25);
  //backdrop-filter: blur(4px);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03);
  position: relative;
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${CardStyle.HEADER_HEIGHT};
  padding: 0 ${CardStyle.PADDING};
  //backdrop-filter: blur(4px);

  //background-color: rgba(255, 255, 255, 0.0025);
  //border-bottom: 1px solid rgba(255, 255, 255, 0.01);
  //box-shadow: 4px 0 10px 0 rgba(0, 0, 0, 0.25);

  > h1 {
    margin: 0;
    color: rgba(255, 255, 255, 0.75);
    font-size: 13px;
    font-weight: lighter;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  > h3 {
    margin: 0;
    color: rgba(255, 255, 255, 0.3);
    font-size: 12px;
    font-weight: lighter;
  }
`

const SHADOW_HEIGHT = Spacing(1)
const SHADOW_CLIP_HEIGHT = `calc(${SHADOW_HEIGHT} * 2.5)`

const HeaderShadow = styled.div`
  position: absolute;
  top: calc(${CardStyle.HEADER_HEIGHT} - ${SHADOW_HEIGHT});
  left: 0;
  right: 0;
  height: ${SHADOW_HEIGHT};

  :before {
    position: absolute;
    content: '';
    left: 2%;
    right: 2%;
    bottom: 0;
    top: 0;
    border-radius: 50% / ${SHADOW_HEIGHT};
    box-shadow: rgba(0, 0, 0, 0.1) 0 ${Spacing(0.25)} ${Spacing(0.5)};
    clip-path: polygon(
      0% ${SHADOW_HEIGHT},
      0% ${SHADOW_CLIP_HEIGHT},
      100% ${SHADOW_CLIP_HEIGHT},
      100% ${SHADOW_HEIGHT}
    );
  }
`

const StyledSimpleBar = styled(SimpleBar)`
  height: ${CardStyle.HEIGHT};
  margin-bottom: ${Spacing(0.25)};
  position: relative;
  z-index: 0;

  .simplebar-scrollbar {
    opacity: 0.25;

    &:before {
      background-color: ${Colors.BLACK};
    }
  }
`

const Body = styled.div`
  padding: ${CardStyle.PADDING};
`
