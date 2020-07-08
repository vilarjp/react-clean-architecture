import React from 'react'
import Styles from './SurveyCardLoading-styles.scss'

const SurveyCardLoading: React.FC = () => {
  return (
    <>
      <li className={Styles.surveyCardLoading} />
      <li className={Styles.surveyCardLoading} />
      <li className={Styles.surveyCardLoading} />
    </>
  )
}

export default SurveyCardLoading
