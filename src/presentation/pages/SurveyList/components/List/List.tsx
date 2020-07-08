import React, { useContext } from 'react'
import { SurveyModel } from '@/domain/models'
import Styles from './List-styles.scss'
import SurveyCard from '../SurveyCard/SurveyCard'
import SurveyCardLoading from '../SurveyCardLoading/SurveyCardLoading'

import SurveyContext from '../../context/SurveyContext'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={Styles.list} data-testid="survey-list">
      {state.surveys.length ? (
        state.surveys.map((survey: SurveyModel) => (
          <SurveyCard key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyCardLoading />
      )}
    </ul>
  )
}

export default List
