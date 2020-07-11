/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from 'react'
import { SurveyResultAnswerModel } from '@/domain/models'
import AnswerContext from '../../context/AnswerContext'

import Styles from './Answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useContext(AnswerContext)

  const isActive = answer.isCurrentAccountAnswer ? Styles.active : ''
  const handleAnswerClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    if (event.currentTarget.classList.contains(Styles.active)) {
      return
    }
    onAnswer(answer.answer)
  }
  return (
    <li
      data-testid="answer-wrap"
      className={`${Styles.answerWrap} ${isActive}`}
      onClick={handleAnswerClick}
    >
      {answer.image && (
        <img data-testid="image" src={answer.image} alt={answer.answer} />
      )}
      <span data-testid="answer" className={Styles.answer}>
        {answer.answer}
      </span>
      <span data-testid="percent" className={Styles.percent}>
        {answer.percent}%
      </span>
    </li>
  )
}

export default Answer
