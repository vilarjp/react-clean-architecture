import React, { useContext } from 'react'
import Styles from './Error-styles.scss'

import SurveyContext from '../../context/SurveyContext'

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div className={Styles.error}>
      <span data-testid="error">{state.error}</span>
    </div>
  )
}

export default Error
