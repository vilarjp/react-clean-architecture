import { LoadSurveyList } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http'
import { RemoteLoadSurveyList } from '@/data/usecases'
import { makeAuthrorizeHttpGetClientDecorator } from '@/main/factories/decorators'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAuthrorizeHttpGetClientDecorator()
  )
}
