import 'normalize.css'
import React from 'react'
import styled from 'styled-components'
import {Spacings} from '../../theme'

export const GridHelper = () => {
  return <MainContainer />
}

const LINE = `${Spacings.UNITS(1, 'raw') - 1}px`
const SIZE = Spacings.UNITS(1)
const LINE_COLOR = 'rgba(0, 0, 0, 0.25)'
const BG_SIZE = `${Spacings.UNITS(1, 'raw') * 10}px`

const MainContainer = styled.div`
  background-image: repeating-linear-gradient(0deg, transparent, transparent ${LINE}, ${LINE}, ${LINE_COLOR} ${SIZE}),
    repeating-linear-gradient(-90deg, transparent, transparent ${LINE}, ${LINE}, ${LINE_COLOR} ${SIZE});
  background-size: ${BG_SIZE} ${BG_SIZE};
  opacity: 0.75;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`
