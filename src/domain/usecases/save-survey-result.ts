import { SurveyResultModel } from '@/domain/models'

export type SaveSurveyResultParams = {
  answer: string
}

export interface SaveSurveyResult {
  save: (params: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
