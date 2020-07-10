import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultModel } from '@/domain/models'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpClient
  ) {}

  async load(): Promise<SurveyResultModel> {
    const httpResponse = await this.httpGetClient.request({
      url: this.url,
      method: 'get'
    })
    const surveyResult = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (surveyResult?.date)
          return { ...surveyResult, date: new Date(surveyResult.date) }
        return {} as SurveyResultModel
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
