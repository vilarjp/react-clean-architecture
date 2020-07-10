import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'
import { mockAccountModel, LoadSurveyListSpy } from '@/domain/test'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { APIContext } from '@/presentation/contexts'
import SurveyList from './SurveyList'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  saveCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const saveCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = () => mockAccountModel()
  render(
    <APIContext.Provider
      value={{
        saveCurrentAccount: saveCurrentAccountMock,
        getCurrentAccount: getCurrentAccountMock
      }}
    >
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </APIContext.Provider>
  )
  return {
    loadSurveyListSpy,
    history,
    saveCurrentAccountMock
  }
}

describe('SurveyList Page', () => {
  it('should render 3 empty items on loading', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  it('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    await waitFor(() => screen.getByText('Paradas'))
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })

  it('should render SurveyCards on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyCard')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(0)
  })

  it('should render error on LoadSurveyList failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByText('Paradas'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  it('should logout on AccessDenied', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError())
    const { saveCurrentAccountMock, history } = makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByText('Paradas'))
    expect(saveCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
