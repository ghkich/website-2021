import 'normalize.css'
import React, {useLayoutEffect, useState} from 'react'
import styled from 'styled-components'

export const GridHelper = () => {
  const [divs, setDivs] = useState([])
  const [colsCount, setColsCount] = useState()
  const [rowsCount, setRowsCount] = useState()
  useLayoutEffect(() => {
    const BLOCK_SIZE = 20
    const width = window.innerWidth
    const height = window.innerHeight

    const cols = parseInt(width / BLOCK_SIZE, 10)
    const rows = parseInt(height / BLOCK_SIZE, 10)
    const total = cols * rows

    setColsCount(cols)
    setRowsCount(rows)

    let count
    const divsArr = []

    for (count = 0; count < total; count++) {
      divsArr.push(count)
    }

    setDivs(divsArr)
  }, [])

  return (
    <MainContainer rowsCount={rowsCount} colsCount={colsCount}>
      {divs.map((div, idx) => (
        <div key={idx}></div>
      ))}
    </MainContainer>
  )
}

const MainContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.colsCount}, 1fr)`};

  > div {
    height: 100%;
    width: 100%;
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
`
