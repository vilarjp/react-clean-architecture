import { HttpResponse } from '.'

export type HttpGetParams = {
  url: string
}

export interface HttpGetClient<ReponseType> {
  get: (params: HttpGetParams) => Promise<HttpResponse<ReponseType>>
}
