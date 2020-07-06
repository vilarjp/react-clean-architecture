import React from 'react'
import { Footer } from '@/presentation/components'
import Styles from './SurveyList-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyList}>
      <header className={Styles.header}>
        <div className={Styles.headerContent}>
          <h1>Pare Aqui</h1>
          <div className={Styles.profile}>
            <span>João</span>
            <button type="button">Sair</button>
          </div>
        </div>
      </header>
      <div className={Styles.content}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>06</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>Qual a avaliação deste lugar?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>06</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>Qual a avaliação deste lugar?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>06</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>Qual a avaliação deste lugar?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>06</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>Qual a avaliação deste lugar?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>06</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>Qual a avaliação deste lugar?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
