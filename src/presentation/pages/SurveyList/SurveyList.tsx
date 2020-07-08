import React, { useEffect, useState } from 'react'
import { Footer, Header } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import Styles from './SurveyList-styles.scss'
import List from './components/List/List'
import Error from './components/Error/Error'

import SurveyContext from './context/SurveyContext'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then(surveys => setState(prevState => ({ ...prevState, surveys })))
      .catch(err =>
        setState(prevState => ({ ...prevState, error: err.message }))
      )
  }, [loadSurveyList])

  return (
    <div className={Styles.surveyList}>
      <Header />
      <div className={Styles.content}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <List />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
