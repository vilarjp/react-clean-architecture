import React from 'react'
import { render, screen } from '@testing-library/react'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import SurveyCard from './SurveyCard'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyCard survey={survey} />)
}

describe('SurveyCard', () => {
  it('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
