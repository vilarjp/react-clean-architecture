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
      didAnswer: true
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  it('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
