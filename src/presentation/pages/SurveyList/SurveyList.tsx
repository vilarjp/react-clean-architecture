import React, { useEffect } from 'react'
import { Footer, Header } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import Styles from './SurveyList-styles.scss'
import SurveyCardLoading from './components/SurveyCardLoading/SurveyCardLoading'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    loadSurveyList.loadAll().then(response => response)
  }, [loadSurveyList])

  return (
    <div className={Styles.surveyList}>
      <Header />
      <div className={Styles.content}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyCardLoading />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
