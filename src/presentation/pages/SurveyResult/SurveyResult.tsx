import React, { useState, useEffect } from 'react'
import { Header, Footer, Loading, Error } from '@/presentation/components'
import { SurveyResultModel } from '@/domain/models'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import Result from './components/Result/Result'
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
        {state.surveyResult && <Result surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
