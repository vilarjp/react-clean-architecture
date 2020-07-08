import React, { useEffect, useState } from 'react'
import { Footer, Header } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import Styles from './SurveyList-styles.scss'
import SurveyCardLoading from './components/SurveyCardLoading/SurveyCardLoading'
import SurveyCard from './components/SurveyCard/SurveyCard'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    loadSurveyList.loadAll().then(surveys => setState({ surveys }))
  }, [loadSurveyList])

  return (
    <div className={Styles.surveyList}>
      <Header />
      <div className={Styles.content}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {state.surveys.length ? (
            state.surveys.map((survey: SurveyModel) => (
              <SurveyCard key={survey.id} survey={survey} />
            ))
          ) : (
            <SurveyCardLoading />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
