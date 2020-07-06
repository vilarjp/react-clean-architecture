import {
  HttpPostParams,
  HttpResponse,
  HttpPostClient
} from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.post(params.url, params.body)
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      }
    } catch (err) {
      if (err.response) {
        axiosResponse = err.response
        return {
          statusCode: axiosResponse.status,
          body: axiosResponse.data
        }
      }
      return {
        statusCode: 500
      }
    }
  }
}
