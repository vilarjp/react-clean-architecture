import React, { useState, useEffect, useCallback } from 'react'
import { Header, Footer, Loading, Error } from '@/presentation/components'
import { SurveyResultModel } from '@/domain/models'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import Result from './components/Result/Result'
import AnswerContext from './context/AnswerContext'

import Styles from './SurveyResult-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult
}: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as SurveyResultModel
  })
  const handleError = useErrorHandler((error: Error) => {
    setState({
      ...state,
      error: error.message,
      surveyResult: null,
      isLoading: false
    })
  })

  // const onAnswer = (answer: string) => {
  //   if (state.isLoading) return
  //   setState(prevState => ({ ...prevState, isLoading: true }))
  //   saveSurveyResult
  //     .save({ answer })
  //     .then(response =>
  //       setState(prevState => ({
  //         ...prevState,
  //         surveyResult: response,
  //         isLoading: false
  //       }))
  //     )
  //     .catch(handleError)
  // }

  const onAnswer = useCallback(
    (answer: string) => {
      if (state.isLoading) return
      setState(prevState => ({ ...prevState, isLoading: true }))
      saveSurveyResult
        .save({ answer })
        .then(response =>
          setState(prevState => ({
            ...prevState,
            surveyResult: response,
            isLoading: false
          }))
        )
        .catch(handleError)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saveSurveyResult, state.isLoading]
  )

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
      <AnswerContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.content}>
          {state.surveyResult && <Result surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} />}
        </div>
      </AnswerContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
