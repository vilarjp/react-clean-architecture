import faker from 'faker'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { mockSurveyListModel } from '@/domain/test'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpClient: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClient = new HttpClientSpy()
  const sut = new RemoteLoadSurveyList(url, httpClient)
  return {
    sut,
    httpClient
  }
}

describe('RemoteLoadSurveyList', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpClient } = makeSut(url)
    await sut.loadAll()
    expect(httpClient.url).toBe(url)
  })

  it('shoud throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('shoud throw UnexpectError if HttpGetClient returns 40x', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('shoud throw UnexpectError if HttpGetClient returns 500', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('shoud return a list of SurveyModel if HttpGetClient returns 200', async () => {
    const { sut, httpClient } = makeSut()
    const httpResult = mockSurveyListModel()
    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual(httpResult)
  })

  it('shoud return a empty list if HttpGetClient returns 204', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = {
      statusCode: HttpStatusCode.noContent
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([])
  })
})
