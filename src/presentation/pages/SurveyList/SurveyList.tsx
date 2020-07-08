import React from 'react'
import { Footer, Header } from '@/presentation/components'
import Styles from './SurveyList-styles.scss'
import SurveyCardLoading from './components/SurveyCardLoading/SurveyCardLoading'

const SurveyList: React.FC = () => {
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
