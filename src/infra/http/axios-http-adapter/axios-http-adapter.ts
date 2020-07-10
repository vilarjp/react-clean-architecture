import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpAdapter implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
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
