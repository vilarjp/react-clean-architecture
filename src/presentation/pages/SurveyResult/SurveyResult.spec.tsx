import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { APIContext } from '@/presentation/contexts'
import {
  mockAccountModel,
  LoadSurveyResultSpy,
  mockSurveyResultModel,
  SaveSurveyResultSpy
} from '@/domain/test'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import SurveyResult from './SurveyResult'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
  history: MemoryHistory
  saveCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy
  saveSurveyResultSpy?: SaveSurveyResultSpy
}

const makeSut = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy()
}: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/', '/surveys/any_id'],
    initialIndex: 1
  })
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
        <SurveyResult
          loadSurveyResult={loadSurveyResultSpy}
          saveSurveyResult={saveSurveyResultSpy}
        />
      </Router>
    </APIContext.Provider>
  )

  return {
    loadSurveyResultSpy,
    saveSurveyResultSpy,
    history,
    saveCurrentAccountMock
  }
}

describe('SurveyResult', () => {
  it('should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  it('should present correct initial state', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  it('should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const survey = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00')
    })
    loadSurveyResultSpy.survey = survey
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('answers').children).toHaveLength(2)
    const answerWrap = screen.queryAllByTestId('answer-wrap')
    expect(answerWrap[0]).toHaveClass('active')
    expect(answerWrap[1]).not.toHaveClass('active')
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', survey.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', survey.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(survey.answers[0].answer)
    expect(answers[1]).toHaveTextContent(survey.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${survey.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${survey.answers[1].percent}%`)
  })

  it('should render error on SurveyResult failure', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.queryByTestId('question')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  it('should logout on AccessDenied', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError())
    const { saveCurrentAccountMock, history } = makeSut({ loadSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(saveCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('should go back on click back button', async () => {
    const { history } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    fireEvent.click(screen.getByTestId('button-wrap'))
    expect(history.location.pathname).toBe('/')
  })

  it('should not present loading on active answer click', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    const answers = screen.getAllByTestId('answer-wrap')
    fireEvent.click(answers[0])
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('should call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    const answers = screen.getAllByTestId('answer-wrap')
    fireEvent.click(answers[1])
    expect(screen.queryByTestId('loading')).toBeInTheDocument()
    expect(saveSurveyResultSpy.params).toEqual({
      answer: loadSurveyResultSpy.survey.answers[1].answer
    })
    await waitFor(() => screen.getByTestId('survey-result'))
  })
})
