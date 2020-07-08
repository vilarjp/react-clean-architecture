import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockPostRequest, mockGetRequest } from '@/data/test'
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

    it('should return correct status code and body via POST', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.post(mockPostRequest())
      const axiosResponse = await mockedAxios.post.mock.results[0].value
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
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

  describe('GET', () => {
    it('should call axios with correct url via GET', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, {
        headers: request.headers
      })
    })

    it('should return correct status code and body via GET', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    it('should return correct status code and body on failure via GET', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const httpResponse = sut.get(mockGetRequest())
      expect(httpResponse).toEqual(mockedAxios.get.mock.results[0].value)
    })

    it('should thrown error on network failure via GET', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.get.mockRejectedValueOnce(new Error())
      const httpResponse = sut.get(mockPostRequest())
      expect(httpResponse).toEqual(mockedAxios.get.mock.results[0].value)
    })
  })
})
