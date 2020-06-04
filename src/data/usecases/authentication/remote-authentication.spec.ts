import { HttpPostClient } from '../../protocols/http/http-post-client'
import RemoteAuthentication from './remote-authentication'

describe('RemoteAuthentication', () => {
  it('shoud call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string
      async post(url: string): Promise<void> {
        this.url = url
        return await Promise.resolve()
      }
    }

    const url = 'api_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
