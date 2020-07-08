import React, { useContext } from 'react'

import SurveyContext from '../../context/SurveyContext'

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div>
      <span data-testid="error">{state.error}</span>
    </div>
  )
}

export default Error
