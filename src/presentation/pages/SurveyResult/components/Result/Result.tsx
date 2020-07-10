import React from 'react'
import { useHistory } from 'react-router-dom'
import FlipMove from 'react-flip-move'
import { Calendar, Button } from '@/presentation/components'
import { SurveyResultModel } from '@/domain/models'
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
      <FlipMove className={Styles.answersList}>
        <ul data-testid="answers">
          {surveyResult.answers.map(answer => (
            <li
              data-testid="answer-wrap"
              key={answer.answer}
              className={answer.isCurrentAccountAnswer ? Styles.active : ''}
            >
              {answer.image && (
                <img
                  data-testid="image"
                  src={answer.image}
                  alt={answer.answer}
                />
              )}
              <span data-testid="answer" className={Styles.answer}>
                {answer.answer}
              </span>
              <span data-testid="percent" className={Styles.percent}>
                {answer.percent}%
              </span>
            </li>
          ))}
        </ul>
      </FlipMove>
      <Button type="button" onClick={goBack}>
        Voltar
      </Button>
    </>
  )
}

export default Result
