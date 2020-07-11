import { SaveSurveyResult } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import { makeAuthrorizeHttpGetClientDecorator } from '@/main/factories/decorators'

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthrorizeHttpGetClientDecorator()
  )
}
