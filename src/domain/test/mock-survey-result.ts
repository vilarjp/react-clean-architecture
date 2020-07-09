import faker from 'faker'
import { SurveyResultModel } from '@/domain/models'

export const mockSurveyResultModel = (): SurveyResultModel => ({
  question: faker.random.words(10),
  date: new Date(faker.date.past().toISOString()),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.random.number(),
      percent: faker.random.number(100)
    },
    {
      answer: faker.random.word(),
      count: faker.random.number(),
      percent: faker.random.number(100)
    }
  ]
})
