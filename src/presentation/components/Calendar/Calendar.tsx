import React from 'react'
import Styles from './Calendar-styles.scss'

type Props = {
  date: Date
  className?: string
}

const Calendar: React.FC<Props> = ({ date, className }: Props) => {
  return (
    <time className={`${Styles.calendar} ${className || ''}`}>
      <span data-testid="day" className={Styles.day}>
        {date.getDate().toString().padStart(2, '0')}
      </span>
      <span data-testid="month" className={Styles.month}>
        {date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
      </span>
      <span data-testid="year" className={Styles.year}>
        {date.getFullYear()}
      </span>
    </time>
  )
}

export default Calendar
