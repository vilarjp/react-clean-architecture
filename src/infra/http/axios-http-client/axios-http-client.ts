import {
  HttpPostParams,
  HttpResponse,
  HttpPostClient
} from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse
    try {
      httpResponse = await axios.post(params.url, params.body)
      return {
        statusCode: httpResponse.status,
        body: httpResponse.data
      }
    } catch (err) {
      if (err?.response) {
        httpResponse = err.response
        return {
          statusCode: httpResponse.status,
          body: httpResponse.data
        }
      }
      return {
        statusCode: 500
      }
    }
  }
}
