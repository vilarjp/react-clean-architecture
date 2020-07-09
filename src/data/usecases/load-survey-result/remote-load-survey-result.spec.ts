import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
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
})
