import { LoadSurveyResult } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteLoadSurveyResult } from '@/data/usecases'
import { makeAuthrorizeHttpGetClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthrorizeHttpGetClientDecorator()
  )
}
