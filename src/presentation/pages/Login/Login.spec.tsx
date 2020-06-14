import React from 'react'
import { render } from '@testing-library/react'
import Login from './Login'

describe('Login Page', () => {
  it('should not render spinner on start', () => {
    const { getByTestId } = render(<Login />)
    const buttonWrap = getByTestId('button-wrap')
    expect(buttonWrap.childElementCount).toBe(0)
  })
})
