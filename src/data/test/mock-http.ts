/* eslint-disable max-classes-per-file */
import {
  HttpPostParams,
  HttpPostClient,
  HttpResponse,
  HttpStatusCode,
  HttpGetClient,
  HttpGetParams
} from '@/data/protocols/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})

export class HttpPostClientSpy<BodyType = any, ReponseType = any>
  implements HttpPostClient<BodyType, ReponseType> {
  url?: string

  body?: BodyType

  response: HttpResponse<ReponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async post(
    params: HttpPostParams<BodyType>
  ): Promise<HttpResponse<ReponseType>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy<ReponseType = any>
  implements HttpGetClient<ReponseType> {
  url: string

  headers?: any

  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.url = params.url
    this.headers = params.headers
    return Promise.resolve(this.response)
  }
}
