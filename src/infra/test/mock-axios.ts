import axios, { AxiosResponse } from 'axios'
import faker from 'faker'

export const mockHttpResponse = (): Omit<
  AxiosResponse,
  'config' | 'statusText' | 'headers' | 'request'
> => ({
  data: faker.random.objectElement(),
  status: faker.random.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
