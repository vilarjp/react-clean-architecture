import faker from 'faker'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockSurveyResultModel, mockSurveySaveResulParams } from '@/domain/test'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'

type SutTypes = {
  httpClientSpy: HttpClientSpy
  sut: RemoteSaveSurveyResult
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    httpClientSpy,
    sut
  }
}

describe('RemoteLoadSurveyResult', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const saveSurveyResultParams = mockSurveySaveResulParams()
    await sut.save(saveSurveyResultParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams)
  })

  it('shoud throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.save(mockSurveySaveResulParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('shoud throw UnexpectError if HttpClient returns 40x', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.save(mockSurveySaveResulParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('shoud throw UnexpectError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.save(mockSurveySaveResulParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('shoud return a SurveyResult if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockSurveyResultModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const surveyResult = await sut.save(mockSurveySaveResulParams())
    expect(surveyResult).toEqual(httpResult)
  })
})
