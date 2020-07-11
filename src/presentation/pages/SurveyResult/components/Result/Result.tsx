import React from 'react'
import { useHistory } from 'react-router-dom'
import { Calendar, Button } from '@/presentation/components'
import { SurveyResultModel } from '@/domain/models'
import Answer from '../Answer/Answer'
import Styles from './Result-styles.scss'

type Props = {
  surveyResult: SurveyResultModel
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()

  return (
    <>
      <div className={Styles.question}>
        <Calendar date={surveyResult.date} className={Styles.calendar} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </div>

      <ul data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map((answer, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Answer key={index} answer={answer} />
        ))}
      </ul>

      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </>
  )
}

export default Result
