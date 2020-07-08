import React from 'react'
import { Footer, Header } from '@/presentation/components'
import Styles from './SurveyList-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyList}>
      <Header />
      <div className={Styles.content}>
        <h2>Enquetes</h2>
        <ul />
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
