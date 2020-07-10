import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import FlipMove from 'react-flip-move'
import {
  Header,
  Footer,
  Loading,
  Calendar,
  Button,
  Error
} from '@/presentation/components'
import { SurveyResultModel } from '@/domain/models'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import Styles from './SurveyResult-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as SurveyResultModel
  })
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })
  const { goBack } = useHistory()

  useEffect(() => {
    loadSurveyResult
      .load()
      .then(response =>
        setState(prevState => ({ ...prevState, surveyResult: response }))
      )
      .catch(handleError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadSurveyResult])

  return (
    <div className={Styles.surveyResult}>
      <Header />
      <div data-testid="survey-result" className={Styles.content}>
        {state.surveyResult && (
          <>
            <div className={Styles.question}>
              <Calendar
                date={state.surveyResult.date}
                className={Styles.calendar}
              />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </div>
            <FlipMove className={Styles.answersList}>
              <ul data-testid="answers">
                {state.surveyResult.answers.map(answer => (
                  <li
                    data-testid="answer-wrap"
                    key={answer.answer}
                    className={
                      answer.isCurrentAccountAnswer ? Styles.active : ''
                    }
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
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
