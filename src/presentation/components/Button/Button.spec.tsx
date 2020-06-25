import React from 'react'
import { render } from '@testing-library/react'
import faker from 'faker'
import FormContext from '@/presentation/contexts/Form/FormContext'
import Button from './Button'

const makeSut = (label: string, theme = '', loading = false) => {
  const sut = render(
    <FormContext.Provider value={{ state: {} }}>
      <Button className="" loading={loading} theme={theme}>
        {label}
      </Button>
    </FormContext.Provider>
  )

  return { sut }
}

describe('Button', () => {
  it('should render button with default ButtonHTMLAttributes', () => {
    const label = faker.random.word()
    const { sut } = makeSut(label)

    const button = sut.getByTestId('button-wrap')
    expect(button.childElementCount).toBe(0)
    expect(button.textContent).toBe(label)
  })

  it('should render button with custom theme', () => {
    const label = faker.random.word()
    const { sut } = makeSut(label, 'buttonGreen')

    const button = sut.getByTestId('button-wrap') as HTMLButtonElement
    expect(button.childElementCount).toBe(0)
    expect(button.textContent).toBe(label)
    expect(button.classList.contains('buttonGreen')).toBeTruthy()
  })

  it('should render loadinng spinner', () => {
    const label = faker.random.word()
    const { sut } = makeSut(label, '', true)

    const button = sut.getByTestId('button-wrap') as HTMLButtonElement
    expect(button.childElementCount).toBe(1)
    expect(button.textContent).toBeFalsy()
    expect(button.disabled).toBe(true)
  })
})
