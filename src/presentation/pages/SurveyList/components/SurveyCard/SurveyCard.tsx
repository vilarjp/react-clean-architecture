import React from 'react'
import { IconName, Icon, Calendar } from '@/presentation/components'
import { SurveyModel } from '@/domain/models'
import Styles from './SurveyCard-styles.scss'

type Props = {
  survey: SurveyModel
}

const SurveyCard: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  return (
    <li className={Styles.surveyCard}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendar} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default SurveyCard
