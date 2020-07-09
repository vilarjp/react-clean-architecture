import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Footer, Header } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { AccessDeniedError } from '@/domain/errors'
import { APIContext } from '@/presentation/contexts'
import List from './components/List/List'
import Error from './components/Error/Error'
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
  const { saveCurrentAccount } = useContext(APIContext)
  const history = useHistory()

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then(surveys => setState(prevState => ({ ...prevState, surveys })))
      .catch(err => {
        if (err instanceof AccessDeniedError) {
          saveCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState(prevState => ({ ...prevState, error: err.message }))
        }
      })
  }, [loadSurveyList, saveCurrentAccount, history])

  return (
    <div className={Styles.surveyList}>
      <Header />
      <div className={Styles.content}>
        <h2>Paradas</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <List />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
