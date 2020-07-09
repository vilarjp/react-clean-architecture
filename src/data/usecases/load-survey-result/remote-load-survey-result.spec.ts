import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'

describe('RemoteLoadSurveyResult', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const htttGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyResult(url, htttGetClientSpy)
    await sut.load()
    expect(htttGetClientSpy.url).toBe(url)
  })
})
