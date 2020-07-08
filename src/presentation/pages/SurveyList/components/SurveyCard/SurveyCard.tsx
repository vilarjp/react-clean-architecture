import React from 'react'
import { IconName, Icon } from '@/presentation/components'
import Styles from './SurveyCard-styles.scss'

const SurveyCard: React.FC = () => {
  return (
    <li className={Styles.surveyCard}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
        <time>
          <span className={Styles.day}>06</span>
          <span className={Styles.month}>07</span>
          <span className={Styles.year}>2020</span>
        </time>
        <p>Qual a avaliação deste lugar?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default SurveyCard
