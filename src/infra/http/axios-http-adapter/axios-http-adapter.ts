import {
  HttpPostParams,
  HttpResponse,
  HttpPostClient,
  HttpGetParams,
  HttpGetClient
} from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpAdapter implements HttpPostClient, HttpGetClient {
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
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.get(params.url, { headers: params.headers })
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
