import React, { useState, useEffect } from 'react'
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
import Styles from './SurveyResult-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as SurveyResultModel
  })

  useEffect(() => {
    loadSurveyResult.load().then().catch()
  }, [loadSurveyResult])

  return (
    <div className={Styles.surveyResult}>
      <Header />
      <div data-testid="survey-result" className={Styles.content}>
        {state.surveyResult && (
          <>
            <div className={Styles.question}>
              <Calendar date={new Date()} className={Styles.calendar} />
              <h2>Pergunta 1?</h2>
            </div>
            <FlipMove className={Styles.answersList}>
              <ul>
                <li>
                  <img
                    src="http://fordevs.herokuapp.com/static/img/logo-react.png"
                    alt="survey"
                  />
                  <span className={Styles.answer}>Resposta</span>
                  <span className={Styles.percent}>50%</span>
                </li>
                <li className={Styles.active}>
                  <img
                    src="http://fordevs.herokuapp.com/static/img/logo-react.png"
                    alt="survey"
                  />
                  <span className={Styles.answer}>Resposta</span>
                  <span className={Styles.percent}>50%</span>
                </li>
                <li>
                  <img
                    src="http://fordevs.herokuapp.com/static/img/logo-react.png"
                    alt="survey"
                  />
                  <span className={Styles.answer}>Resposta</span>
                  <span className={Styles.percent}>50%</span>
                </li>
              </ul>
            </FlipMove>
            <Button type="button">Voltar</Button>
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
