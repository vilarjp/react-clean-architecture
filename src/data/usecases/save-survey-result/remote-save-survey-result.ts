import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases'
import { SurveyResultModel } from '@/domain/models'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async save(params: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
    const saveResult = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (saveResult?.date)
          return { ...saveResult, date: new Date(saveResult.date) }
        return {} as SurveyResultModel
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
