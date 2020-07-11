import faker from 'faker'
import { SurveyResultModel } from '@/domain/models'
import { LoadSurveyResult, SaveSurveyResultParams } from '../usecases'

export const mockSurveySaveResulParams = (): SaveSurveyResultParams => ({
  answer: faker.random.words(5)
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  question: faker.random.words(10),
  date: new Date(faker.date.past().toISOString()),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: true
    },
    {
      answer: faker.random.word(),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: false
    }
  ]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0

  survey = mockSurveyResultModel()

  async load(): Promise<SurveyResultModel> {
    this.callsCount += 1
    return this.survey
  }
}
