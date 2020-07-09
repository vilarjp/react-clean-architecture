import faker from 'faker'
import { SurveyModel } from '@/domain/models'

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
