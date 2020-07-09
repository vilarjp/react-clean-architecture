import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { APIContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import Header from './Header'

type SutTypes = {
  history: MemoryHistory
  saveCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const saveCurrentAccountMock = jest.fn()
  render(
    <APIContext.Provider
      value={{
        saveCurrentAccount: saveCurrentAccountMock,
        getCurrentAccount: () => account
      }}
    >
      <Router history={history}>
        <Header />
      </Router>
    </APIContext.Provider>
  )
  return {
    history,
    saveCurrentAccountMock
  }
}

describe('Header', () => {
  it('should call setCurrentAccount with null', () => {
    const { saveCurrentAccountMock, history } = makeSut()
    fireEvent.click(screen.getByTestId('logout-button'))
    expect(saveCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('should render username correctly ', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
