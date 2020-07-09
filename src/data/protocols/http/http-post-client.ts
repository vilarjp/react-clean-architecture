import { HttpResponse } from '.'

export type HttpPostParams<BodyType> = {
  url: string
  body?: BodyType
}

export interface HttpPostClient<BodyType = any, ReponseType = any> {
  post: (params: HttpPostParams<BodyType>) => Promise<HttpResponse<ReponseType>>
}
