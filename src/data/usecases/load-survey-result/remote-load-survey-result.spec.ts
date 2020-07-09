import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError } from '@/domain/errors'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'

type SutTypes = {
  htttGetClientSpy: HttpGetClientSpy
  sut: RemoteLoadSurveyResult
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const htttGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, htttGetClientSpy)
  return {
    htttGetClientSpy,
    sut
  }
}

describe('RemoteLoadSurveyResult', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, htttGetClientSpy } = makeSut(url)
    await sut.load()
    expect(htttGetClientSpy.url).toBe(url)
  })

  it('shoud throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, htttGetClientSpy } = makeSut()
    htttGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })
})
