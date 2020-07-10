import React from 'react'
import Styles from './Answer-styles.scss'

type Props = {
  answer: {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const isActive = answer.isCurrentAccountAnswer ? Styles.active : ''
  return (
    <li
      data-testid="answer-wrap"
      className={`${Styles.answerWrap} ${isActive}`}
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
