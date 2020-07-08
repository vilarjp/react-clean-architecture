import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { APIContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'
import PrivateRoute from './PrivateRoute'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <APIContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </APIContext.Provider>
  )

  return {
    history
  }
}

describe('PrivateRoute', () => {
  it('should redirect to login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  it('should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
