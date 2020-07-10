import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { APIContext } from '@/presentation/contexts'
import { mockAccountModel, LoadSurveyResultSpy } from '@/domain/test'
import SurveyResult from './SurveyResult'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  render(
    <APIContext.Provider
      value={{
        saveCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </APIContext.Provider>
  )

  return {
    loadSurveyResultSpy
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
})
