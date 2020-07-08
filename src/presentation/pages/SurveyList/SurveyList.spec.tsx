import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'
import { UnexpectedError } from '@/domain/errors'
import SurveyList from './SurveyList'

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  surveys = mockSurveyListModel()

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount += 1
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return {
    loadSurveyListSpy
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
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByText('Paradas'))
  })

  it('should render SurveyCards on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyCard')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(0)
  })

  it('should render error LoadSurveyList failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByText('Paradas'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })
})
