import faker from 'faker'
import { SurveyModel } from '@/domain/models'

export const mockSurveyListModel = (): SurveyModel[] => [
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(4)
      }
    ],
    date: faker.date.past(),
    didAnswer: faker.random.boolean()
  }
]