import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import React from 'react'
import {Card} from '../components/Card'

it('loads and displays Teste', async () => {
  render(
    <Card title="Teste">
      <p>asefsaefas</p>
    </Card>,
  )

  expect(screen.getByText('Teste')).toHaveTextContent('Teste')
})
