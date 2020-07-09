import faker from 'faker'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '../usecases'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.random.uuid(),
  question: faker.random.words(10),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(4)
    }
  ],
  date: new Date(faker.date.past().toISOString()),
  didAnswer: faker.random.boolean()
})

export const mockSurveyListModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
]

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  surveys = mockSurveyListModel()

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount += 1
    return this.surveys
  }
}
