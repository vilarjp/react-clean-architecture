import axios from 'axios'
import faker from 'faker'

const mockedAxios = axios as jest.Mocked<typeof axios>

export const mockAxios = (): jest.Mocked<typeof axios> => {
  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.random.number()
  })
  return mockedAxios
}
