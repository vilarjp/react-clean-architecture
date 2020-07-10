import React from 'react'
import FlipMove from 'react-flip-move'
import { Header, Footer, Loading, Calendar } from '@/presentation/components'
import Styles from './SurveyResult-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResult}>
      <Header />
      <div className={Styles.content}>
        <div className={Styles.question}>
          <Calendar date={new Date()} className={Styles.calendar} />
          <h2>Pergunta 1?</h2>
        </div>
        <FlipMove className={Styles.answersList}>
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
        </FlipMove>
        <button type="button">Voltar</button>
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
