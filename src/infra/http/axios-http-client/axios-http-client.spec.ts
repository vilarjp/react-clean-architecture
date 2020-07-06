import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockPostRequest } from '@/data/test'
import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  describe('POST', () => {
    it('should call axios with correct url and body via POST', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should return correct status code and body via POST', () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = sut.post(mockPostRequest())
      expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })

    it('should return correct status code and body on failure via POST', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const httpResponse = sut.post(mockPostRequest())
      expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })

    it('should thrown error on network failure via POST', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce(new Error())
      const httpResponse = sut.post(mockPostRequest())
      expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
})
