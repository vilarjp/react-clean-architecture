import React, { useEffect, useState } from 'react'
import { Footer, Header, Error } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { useErrorHandler } from '@/presentation/hooks'
import List from './components/List/List'
import SurveyContext from './context/SurveyContext'

import Styles from './SurveyList-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then(surveys => setState(prevState => ({ ...prevState, surveys })))
      .catch(handleError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadSurveyList])

  return (
    <div className={Styles.surveyList}>
      <Header />
      <div className={Styles.content}>
        <h2>Paradas</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error error={state.error} /> : <List />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
