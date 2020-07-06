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

export class HttpPostClientSpy<BodyType, ReponseType>
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

export class HttpGetClientSpy<ReponseType>
  implements HttpGetClient<ReponseType> {
  url: string

  response: HttpResponse<ReponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async get(params: HttpGetParams): Promise<HttpResponse<ReponseType>> {
    this.url = params.url
    return Promise.resolve(this.response)
  }
}
