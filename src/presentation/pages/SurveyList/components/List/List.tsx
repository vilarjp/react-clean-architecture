import React from 'react'
import { SurveyModel } from '@/domain/models'
import Styles from './List-styles.scss'
import SurveyCard from '../SurveyCard/SurveyCard'
import SurveyCardLoading from '../SurveyCardLoading/SurveyCardLoading'

type Props = {
  surveys: SurveyModel[]
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={Styles.list} data-testid="survey-list">
      {surveys.length ? (
        surveys.map((survey: SurveyModel) => (
          <SurveyCard key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyCardLoading />
      )}
    </ul>
  )
}

export default List
