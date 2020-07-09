import { HttpResponse } from '.'

export type HttpGetParams = {
  url: string
  headers?: any
}

export interface HttpGetClient<ReponseType = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<ReponseType>>
}
