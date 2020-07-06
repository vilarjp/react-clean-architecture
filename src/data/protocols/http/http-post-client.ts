import { HttpResponse } from '.'

export type HttpPostParams<BodyType> = {
  url: string
  body?: BodyType
}

export interface HttpPostClient<BodyType, ReponseType> {
  post: (params: HttpPostParams<BodyType>) => Promise<HttpResponse<ReponseType>>
}
