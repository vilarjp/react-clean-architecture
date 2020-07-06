import {
  HttpPostParams,
  HttpResponse,
  HttpPostClient,
  HttpGetParams,
  HttpGetClient
} from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient
  implements
    HttpPostClient<HttpPostParams<any>, HttpResponse<any>>,
    HttpGetClient<HttpResponse<any>> {
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

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const axiosResponse = await axios.get(params.url)
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
