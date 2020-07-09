import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { APIContext } from '@/presentation/contexts'
import Header from './Header'

describe('Header', () => {
  it('should call setCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const saveCurrentAccountMock = jest.fn()
    render(
      <APIContext.Provider
        value={{ saveCurrentAccount: saveCurrentAccountMock }}
      >
        <Router history={history}>
          <Header />
        </Router>
      </APIContext.Provider>
    )
    fireEvent.click(screen.getByTestId('logout-button'))
    expect(saveCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
