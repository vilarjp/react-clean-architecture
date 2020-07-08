import React from 'react'
import { render, screen } from '@testing-library/react'
import SurveyList from './SurveyList'

describe('SurveyList Page', () => {
  it('should render 3 empty items on loading', () => {
    render(<SurveyList />)
    const sut = screen.getByTestId('survey-list')
    expect(sut.querySelectorAll('li:empty').length).toBe(3)
  })
})
