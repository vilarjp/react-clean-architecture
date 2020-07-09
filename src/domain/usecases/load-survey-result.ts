import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResult {
  load: () => Promise<SurveyResultModel>
}
