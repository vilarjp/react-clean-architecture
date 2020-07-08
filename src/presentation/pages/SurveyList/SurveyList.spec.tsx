import React from 'react'
import { render, screen } from '@testing-library/react'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import SurveyList from './SurveyList'

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount += 1
    return []
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Page', () => {
  it('should render 3 empty items on loading', () => {
    makeSut()
    const sut = screen.getByTestId('survey-list')
    expect(sut.querySelectorAll('li:empty').length).toBe(3)
  })

  it('should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
