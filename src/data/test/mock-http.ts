/* eslint-disable max-classes-per-file */
import {
  HttpRequest,
  HttpClient,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http'
import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

export class HttpClientSpy implements HttpClient {
  url?: string

  method?: string

  body?: any

  headers?: any

  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async request(params: HttpRequest): Promise<any> {
    this.url = params.url
    this.method = params.method
    this.body = params.body
    this.headers = params.headers
    return Promise.resolve(this.response)
  }
}
